# 20200402 example https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask
# Flask web API - server side v.2
# Using database 
import flask 
from flask import request, jsonify
import sqlite3

app = flask.Flask(__name__)
app.config['DEBUG'] = True

# Alter the returning row of db query
# https://docs.python.org/2/library/sqlite3.html#sqlite3.Connection.row_factory
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d 
    
@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    conn = sqlite3.connect('books.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_books = cur.execute('SELECT * FROM books;').fetchall()
    
    return jsonify(all_books)
    
# error handler 404
@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.route('/api/v1/resources/books', methods=['GET'])
def api_filter():
    query_parameters = request.args
    
    id = query_parameters.get('id')
    published = query_parameters.get('published')
    author = query_parameters.get('author')
    
    query = "SELECT * FROM books WHERE "
    to_filter = []
    
    # build SQL
    if id:
        query += ' id=? AND'
        to_filter.append(id)
    if published:
        query += ' published=? AND'
        to_filter.append(published)
    if author:
        query += ' author=? AND'
        to_filter.append(author)
    if not (id or published or author):
        return page_not_found(404)
    # this :-4 step is great! 
    query = query[:-4] + ';'
    
    conn = sqlite3.connect('books.db')
    # register the function to process returning data
    conn.row_factory = dict_factory
    cur = conn.cursor()
    
    results = cur.execute(query, to_filter).fetchall()
    
    return jsonify(results)
        
if __name__ == "__main__":        
    app.run()

# 20200402 server side web API with database support
# 
# Python Standard Library:sqlite3.Connection.row_factory
# https://docs.python.org/2/library/sqlite3.html#sqlite3.Connection.row_factory
# Allowing user redefining the returning row. (Good code is universal.
# This function learnt from tutorial comes from Python Docs. )

# This sample using db file downloaded from tutorial. The data is 
# abundant. For scaling design, big data set is always preferred. 
# Tested bugs are never the problem, untested bugs are.
# 
# 20200409 update comments  