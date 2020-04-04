import sqlite3
from sqlite3 import Error 

def create_connection(db_file):
    ''' create a database connection to a SQLight database '''
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)

    return conn;
    
def init_tables(conn):
    try:
        c = conn.cursor()
        fp = open('lastfm.sql')
        c.execute(fp.read())
    except Error as e:
        print(e)
    
def init_db(db_file):
    print(db_file)
    conn = create_connection(db_file)
    init_tables(conn)
    conn.close()
    
def test_db(file_data, db_file):
        fp = open(file_data, "r")
        conn = create_connection(db_file)
        print("insert")
        sql = "insert into fmDump (jsonData) values (?) "
        print(sql)
        datain = fp.read(188);

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
        
def check_count(db_file):
    conn = create_connection(db_file)
    cur = conn.cursor()
    sql = "select count(id) from fmDump"
    cur.execute(sql)
    rows = cur.fetchall()
    for row in rows:
        print("current count(id) {}".format(row))  
    conn.close()

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
