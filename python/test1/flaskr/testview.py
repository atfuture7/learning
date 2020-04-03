from flask import Blueprint 

bp = Blueprint('testview', __name__)

@bp.route('/')
def testres():
    return "view string"
    
