from flask import (
    Blueprint, redirect, render_template, request, url_for, make_response
)

from recruiterpage.auth import login_required

from model import db, User

bp = Blueprint("scores", __name__)

def query(invited, min_score, max_score, join_date):
    # Build query
    query = User.query
    if invited != "any":
        query = query.filter(User.has_been_emailed == (invited == "yes"))
    if min_score:
        query = query.filter(User.total_score >= min_score)
    if max_score:  
        query = query.filter(User.total_score <= max_score)
    if join_date:
        query = query.filter(User.last_played >= join_date)


    # Display higher scores first
    return query.order_by(User.total_score.desc()).limit(20).all()


@bp.route("/", methods=("GET", "POST"))
@login_required 
def index():
    if(request.method == "POST"):

        invited = request.form["invited"]
        min_score = request.form["min_score"]
        max_score = request.form["max_score"]
        join_date = request.form["join_date"]         

        # Store form data in cookies
        response = make_response(redirect("/"))
        response.set_cookie("invited", invited)
        response.set_cookie("min_score", min_score)
        response.set_cookie("max_score", max_score)
        response.set_cookie("join_date", join_date)

        return response

    else:
        # Retrieve form data from cookies and load
        invited = request.cookies.get("invited", "any")
        min_score = request.cookies.get("min_score", "")
        max_score = request.cookies.get("max_score", "")
        join_date = request.cookies.get("join_date", "")        
        
        values = query(invited, min_score, max_score, join_date)
        
        return render_template("scores/index.html", values=values, length=len(values),
                invited=invited, min_score=min_score, max_score=max_score, join_date=join_date)


@bp.route('/update_email_status', methods=['POST'])
def update_email_status():
    if request.method == 'POST':

        pairs = request.form.to_dict()        

        for key, value in pairs.items():
            if key.startswith('emailed_'):

                user_id = (key.split('_')[1])

                if "checked_"+str(user_id) in pairs:
                    checked = pairs["checked_" + user_id] == 'on'
                else:                    
                    checked = False

                if( (value=='True') != checked ): 
                    # checkbox value is not the same as has_been_emailed
                    user = User.query.get(user_id)
                    user.has_been_emailed = checked
                    db.session.commit()


        return redirect(url_for("scores.index"))

