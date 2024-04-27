from flask import (
    Blueprint, render_template
)

from recruiterpage.auth import login_required

from model import db, User

import plotly.graph_objs as go
import pandas as pd

bp = Blueprint("vis", __name__)

@bp.route("/visual")
@login_required 
def visual():

    # Histogram
    total_scores = User.query.with_entities(User.total_score).all()
    total_scores = [score[0] for score in total_scores]

    df = pd.DataFrame(total_scores, columns=['Total Score'])

    data = [go.Histogram(x=df['Total Score'], marker=dict(color='skyblue'), nbinsx=50)]  
    layout = go.Layout(title='Distribution of Total Scores', xaxis=dict(title='Total Score'), yaxis=dict(title='Frequency'))
    fig = go.Figure(data=data, layout=layout)

    hist_json = fig.to_json()


    # Pie Chart
    emailed_count = User.query.filter_by(has_been_emailed=True).count()
    not_emailed_count = User.query.filter_by(has_been_emailed=False).count()

    labels = ["Emailed", "Not Emailed"]
    values = [emailed_count, not_emailed_count]
    colors = ["#6495ED", "#FFA07A"]
    pie_trace = go.Pie(labels=labels, values=values, marker=dict(colors=colors))

    layout = go.Layout(title='Distribution of People Emailed',)
    fig = go.Figure(data=[pie_trace], layout=layout)

    pie_json = fig.to_json()


    return render_template("visual/visualisations.html", hist_json=hist_json, pie_json=pie_json)
