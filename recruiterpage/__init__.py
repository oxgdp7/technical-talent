import os
from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)    

    app.secret_key = "dev"
    app.config.update(
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SECURE=True,
        SQLALCHEMY_DATABASE_URI="sqlite:///table.db",
    )

    app.config.from_pyfile("config.py", silent=True)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass 
    
    from model import db 
    db.init_app(app)   

    from . import auth
    app.register_blueprint(auth.bp)
    
    from . import scores
    app.register_blueprint(scores.bp)
    app.add_url_rule("/", endpoint="index")    

    from . import vis
    app.register_blueprint(vis.bp)

    return app