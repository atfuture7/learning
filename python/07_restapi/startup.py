# 20200402 example https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask
# Flask web API - server side v.1 
# Using static data
import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config['DEBUG'] = True

# create data, a list of dictionary
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]

# endpoint - root
# default message
@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

# endpoint 
# a route to return all of the available entries in our catalog
@app.route('/api/v1/resources/books/all', methods=['GET'] )
def api_all():
    return jsonify(books)

# endpoint
# query a book with ID (The id in dictionary, not on the list)
@app.route('/api/v1/resources/books',methods=['GET'])
def api_id():
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id"
        
    results = []
    
    for book in books:
        if book['id'] == id: 
            results.append(book)
            
    return jsonify(results)

    
app.run()

# 20200402 
# Static data is usually not the best selection, but sometimes necessary.
# ex. data transfer
# Programmers/enterprises should not always count on user input directly. 
# There are also possibilities of replacement of the entire system or 
# merge other systems. Not all system using the same storage method 
# or structure, dumpping data out as text/static format is the ultmate 
# way guerenteeing least merging-faluire.  

# jsonify()
# flask.json.jsonify(*args, **kwargs) 
# https://flask.palletsprojects.com/en/1.1.x/api/
# A module belones to Flask, different from 
# Python Standard Library: https://docs.python.org/3/library/json.html
# Either args or kwargs is accepted, not both. 
   
# 20200409 update comments   