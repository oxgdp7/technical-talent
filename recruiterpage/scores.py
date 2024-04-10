from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from recruiterpage.auth import login_required

from model import db, User, LevelScore
import datetime

bp = Blueprint("scores", __name__)

@bp.route("/", methods=("GET", "POST"))
@login_required 
def index():

    if(request.method == "POST"):

        invited = request.form["invited"]
        min_score = request.form["min_score"]
        max_score = request.form["max_score"]
        join_date = request.form["join_date"]
           
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

        values = query.order_by(User.total_score.desc()).limit(20).all()
    else:
        # Display higher scores first
        values = User.query.order_by(User.total_score.desc()).limit(20).all()

    return render_template("scores/index.html", values=values, length=len(values))

