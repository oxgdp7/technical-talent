from authlib.integrations.flask_client import OAuth
from flask import (
    Flask,
    render_template,
    session,
    redirect,
    url_for,
)
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy import event
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

from model import db, User, LevelScore, Recruiter

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SECURE=True,
    SQLALCHEMY_DATABASE_URI="sqlite:///table.db",
)

db.init_app(app)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

# maintain total_score invariant
def update_user_total_score(mapper, connection, target):
    # updates the total_score of a User whenever a LevelScore is inserted or updated.
    user_id = target.user_id
    user = User.query.get(user_id)
    if user:
        user.total_score = sum([ls.score for ls in user.scores])
        db.session.commit()


event.listen(LevelScore, "after_insert", update_user_total_score)
event.listen(LevelScore, "after_update", update_user_total_score)
event.listen(LevelScore, "after_delete", update_user_total_score)


# OAuth 2 client setup
oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url="https://accounts.google.com/o/oauth2/token",
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    api_base_url="https://www.googleapis.com/oauth2/v1/",
    client_kwargs={"scope": "email profile"},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
)


def get_user(google_id):
    return User.query.filter_by(google_id=google_id).first()


def get_users_by_total_score(lower_bound=None, upper_bound=None):
    query = User.query.order_by(User.total_score.desc())
    if lower_bound is not None:
        query = query.filter(User.total_score >= lower_bound)
    if upper_bound is not None:
        query = query.filter(User.total_score <= upper_bound)
    return query.all()


def get_users_by_level_score(level, lower_bound=None, upper_bound=None):
    query = (
        db.session.query(User, LevelScore)
        .join(LevelScore)
        .filter(LevelScore.level_id == level)
        .order_by(LevelScore.score.desc())
    )
    if lower_bound is not None:
        query = query.filter(LevelScore.score >= lower_bound)
    if upper_bound is not None:
        query = query.filter(LevelScore.score <= upper_bound)
    return query.all()


def create_or_update_user(google_id, user_email, user_name):
    if user_name is None:
        user_name = ""
    user = get_user(google_id)
    if user is None:
        user = User(
            google_id=google_id,
            email=user_email,
            name=user_name,
            last_played=datetime.now(timezone.utc),
        )
        db.session.add(user)
    else:
        user.email = user_email
        user.name = user_name
    db.session.commit()
    return user


@app.after_request
def set_security_headers(response):
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; img-src 'self' data: http://w3.org/2000/svg;"
    )
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Strict-Transport-Security"] = (
        "max-age=31536000; includeSubDomains"
    )
    return response


@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/login")
def login():
    google = oauth.create_client("google")
    redirect_uri = url_for("authorize", _external=True)
    return google.authorize_redirect(redirect_uri, prompt="select_account")


@app.route("/authorize")
def authorize():
    google = oauth.create_client("google")
    try:
        token = google.authorize_access_token()
        id_info = id_token.verify_oauth2_token(
            token["id_token"], requests.Request(), GOOGLE_CLIENT_ID
        )
        session["user_id"] = create_or_update_user(
            id_info["sub"], id_info["email"], id_info.get("name")
        ).google_id
    except Exception as e:
        # Log the error and inform the user
        print(f"Authentication error: {e}")
        # something like https://idp.shibboleth.ox.ac.uk/idp/profile/SAML2/Redirect/SSO?execution=e1s1
        return render_template("error/auth_error.html"), 400
    return redirect("/")


@app.route("/logout")
def logout():
    session.pop("user_id", None)
    return redirect("/")


@app.errorhandler(404)
def not_found(e):
    # TODO: create error pages
    return "404 not found", 404


@app.errorhandler(403)
def forbidden(e):
    return "403 forbidden", 403


@app.errorhandler(500)
def internal(e):
    return "500 internal server error", 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

        default_user = Recruiter(username = "username", 
            password = "scrypt:32768:8:1$OjTG32paY7lO2En1$3395ccb114c3df243a57aacdf169572c427e2310a76e6b2fed5bc41b854586344361aad24e20a8655cfe930aeb9172370b79fb0ab058691537177564df8fe743")
        
        db.session.add(default_user)
        db.session.commit()

    app.run(host="0.0.0.0", port=5000, ssl_context="adhoc")