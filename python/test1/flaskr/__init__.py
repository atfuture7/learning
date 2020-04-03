import os
from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from . import testview
    app.register_blueprint(testview.bp)
    
    return app
    

    