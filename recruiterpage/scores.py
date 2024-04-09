from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from recruiterpage.auth import login_required

from model import db, User, LevelScore

bp = Blueprint("scores", __name__)

@bp.route("/")
@login_required 
def index():

    # Display higher scores first
    values = User.query.order_by(User.total_score.desc()).all()

    return render_template("scores/index.html", values=values)

