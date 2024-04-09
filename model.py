from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from sqlalchemy.orm import validates

db = SQLAlchemy()


class Recruiter(db.Model):
    __tablename__ = "recruiters"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique = True, nullable=False)
    password = db.Column(db.String(256), nullable=False)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String(256), unique=True, nullable=False, index=True)
    name = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(256), unique=True, nullable=False)
    last_played = db.Column(db.DateTime)
    has_been_emailed = db.Column(db.Boolean, default=False)
    total_score = db.Column(db.Integer, default=0)
    scores = db.relationship("LevelScore", backref="user", lazy=True)


class LevelScore(db.Model):
    __tablename__ = "level_scores"
    id = db.Column(db.Integer, primary_key=True)
    level_id = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    @validates("score")
    def validate_score(self, key, value):
        if not isinstance(value, int) or value < 0:
            raise AssertionError(f"{key} must be a non-negative integer")
        return value