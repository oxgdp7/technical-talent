# Run this after initialising the db through app.py to add data to the DB

from flask import Flask
from model import Recruiter, User, LevelScore, db
from datetime import datetime, timezone


app = Flask(__name__, instance_relative_config=True)    
app.secret_key = "dev"
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SECURE=True,
    SQLALCHEMY_DATABASE_URI="sqlite:///table.db",
)
db.init_app(app)   
app.app_context().push()


# Sample data for each table
# Password in the login page is password
recruiters = [
    Recruiter(username="username1", password="scrypt:32768:8:1$OjTG32paY7lO2En1$3395ccb114c3df243a57aacdf169572c427e2310a76e6b2fed5bc41b854586344361aad24e20a8655cfe930aeb9172370b79fb0ab058691537177564df8fe743"),
    Recruiter(username="username2", password="scrypt:32768:8:1$OjTG32paY7lO2En1$3395ccb114c3df243a57aacdf169572c427e2310a76e6b2fed5bc41b854586344361aad24e20a8655cfe930aeb9172370b79fb0ab058691537177564df8fe743"),
]

users = [
    User(google_id="user1_google_id1", name="John Doe", email="John.Doe@gmail.com", last_played=datetime.now(timezone.utc),
         has_been_emailed = True, total_score = 100),


    User(google_id="user2_google_id2", name="Sarah Jane", email="Sarah.Jane@example.com", last_played=datetime.now(timezone.utc),
         has_been_emailed = False, total_score = 50),

    User(google_id="user2_google_id3", name="Martin Smith", email="Martion.Smith@example.com", last_played=datetime.now(timezone.utc),
         has_been_emailed = True, total_score = 150),
]

level_scores = [
    LevelScore(user=users[0], level_id=1, score=50, timestamp=datetime.now(timezone.utc)),
    LevelScore(user=users[0], level_id=2, score=50, timestamp=datetime.now(timezone.utc)),


    LevelScore(user=users[1], level_id=1, score=50, timestamp=datetime.now(timezone.utc)),

    LevelScore(user=users[2], level_id=1, score=75, timestamp=datetime.now(timezone.utc)),
    LevelScore(user=users[2], level_id=2, score=75, timestamp=datetime.now(timezone.utc)),
]


def add_sample_data():
    # Create database session (if not already done)
    session = db.session

    # Add data to each table
    session.add_all(recruiters)
    session.add_all(users)
    session.add_all(level_scores)

    # Commit changes to the database
    session.commit()

    print("Sample data added successfully!")

add_sample_data()