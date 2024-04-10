from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from recruiterpage.auth import login_required

from model import db, User, LevelScore


bp = Blueprint("vis", __name__)


@bp.route("/visual")
@login_required 
def visual():
    return render_template("visual/visualisations.html")
