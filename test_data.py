# Run this after initialising the db through app.py to add data to the DB

from flask import Flask
from model import Recruiter, User, LevelScore, db
from datetime import date, timedelta
import random
import string

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


def gen_str(length):
  char_set = string.ascii_uppercase + string.ascii_lowercase
  random_string = ''.join(random.choices(char_set, k=length))
  return random_string


def gen_date():
  current_date = date.today()
  previous_year = current_date.year - 1

  start_date = date(previous_year, 1, 1)  
  end_date = date(previous_year, 12, 31)  

  day_count = (end_date - start_date).days + 1

  random_day_offset = random.randint(0, day_count - 1)

  random_date = start_date + timedelta(days=random_day_offset)

  return random_date


users = []
for i in range(100):
    users.append(User(google_id = "user_google_id_" + str(i), name=gen_str(10), email=gen_str(6)+"@gmail.com", last_played=gen_date(),
            has_been_emailed=random.choice([True,False]), total_score = random.randint(0, 300)))


level_scores = []
for i in range(100):
   for j in range(1,4):
    level_scores.append(LevelScore(user=users[i], level_id=j, score=random.randint(0, 100), timestamp=gen_date()))


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