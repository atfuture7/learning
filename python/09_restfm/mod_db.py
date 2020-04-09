# 20200403  
# Use SQLite2 to keep data from REST API
import sqlite3
from sqlite3 import Error 

# create/connect database
def create_connection(db_file):
    ''' create a database connection to a SQLight database '''
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)

    return conn

# create table     
def init_tables(conn):
    try:
        c = conn.cursor()
        fp = open('lastfm.sql')
        c.execute(fp.read())
    except Error as e:
        print(e)

# step 0, initialization    
def init_db(db_file):
    print(db_file)
    conn = create_connection(db_file)
    init_tables(conn)
    conn.close()

# [test] test create, read, update, and delete[1] (CRUD) 
def test_db(file_data, db_file):
        fp = open(file_data, "r")
        conn = create_connection(db_file)
        print("insert")
        sql = "insert into fmDump (jsonData) values (?) "
        print(sql)
        datain = fp.read(188)

        cur = conn.cursor()
        cur.execute(sql, (datain,))
        
        print("query")
        sql = "select * from fmDump"
        cur.execute(sql)

        rows = cur.fetchall()
        for row in rows:
            print(row)
        
        print("delete")
        sql = "delete from fmDump"
        cur.execute(sql)

        conn.close()

# [test] test if successfully committed.
def check_count(db_file):
    conn = create_connection(db_file)
    cur = conn.cursor()
    sql = "select count(id) from fmDump"
    cur.execute(sql)
    rows = cur.fetchall()
    for row in rows:
        print("current count(id) {}".format(row))  
    conn.close()

# [test] test if add-column succeeded
def test_db_add_column(db_file):
    conn = create_connection(db_file)
    cur = conn.cursor()
    sql = "ALTER TABLE fmDump ADD COLUMN act_type int"
    cur.execute(sql)
    
    sql = "update fmDump set act_type=2"
    cur.execute(sql)
    conn.commit()
    
    sql = "select id, act_type, create_at from fmDump"
    cur.execute(sql)
    rows = cur.fetchall()
    for row in rows: 
        print(row)
    conn.close()
    
# [test] check if data exists
def check_tag_rec(db_file):
    conn = create_connection(db_file)
    cur = conn.cursor()
    sql = "select jsonData from fmDump where act_type=6"
    print(sql)
    cur.execute(sql)
    rows = cur.fetchall()
    for row in rows:
        print("{}".format(row)[:30])
    conn.close()

# 20200404 completed
# mod_db module is for storing data queeied vis REST API
# Users agree on the guideline and limitation defined by the server side. 
# But test is unpredictable. Data saved for further usage is a convenient 
# tacktick. Raw data here is much different from the format on 
# visualization. 

# This tactic is not using real-time data. (API always return real-time 
# data) mod_parse works on data from database. If the user want new dataset, 
# clear table/database first, and then query another new set. 

#20200409 update comments