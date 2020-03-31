from flask import Flask, url_for
from markupsafe import escape

#init app 
app = Flask(__name__)

# diff from path 
@app.route('/')
def hello_world():
	return 'Index page'
	
@app.route('/hello')
def hello():
    return 'Hello, World'

# use escape
# receive input from url
@app.route('/user/<username>')
def shor_username(username):
    return 'User %s' % escape(username)
    
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    return 'Subpath %s' % escape(subpath)
# subpath ignore following parameters

# with or without /
# tailed with / accept both tailed or omitted 
@app.route('/projects/')
def projects():
    return 'The project page.'
    
@app.route('/about')
def about():
    return 'The about page'

#URL reversing function url_for, trace back funtion:url mapping
with app.test_request_context():
    print(url_for( 'hello_world' ))
    print(url_for( 'projects', next='/'))
    print(url_for( 'shor_username', username='John Doe'))
    