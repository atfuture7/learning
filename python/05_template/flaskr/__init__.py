import os

from flask import Flask, render_template;

# specify template folder is easier....
app = Flask(__name__, template_folder='../templates')
    
@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)