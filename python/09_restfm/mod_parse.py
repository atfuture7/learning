import json
import pandas as pd
import mod_db


def jprint(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

def load_source(filename, isDB, sql):
    retJson = []
    if isDB:
        jsoblist = [];
        conn = mod_db.create_connection(filename);
        cur = conn.cursor()
        #sql = "select jsonData, id from fmDump"
        print(sql)
        cur.execute(sql)

        rows = cur.fetchall()
        for row in rows:
            print("at record id {}".format(row[1]))
            jsstr = row[0].replace("\\'", r"'")
            jsobj = json.loads(jsstr)
            jsoblist.append(jsobj)
        retJson = jsoblist
        conn.close()
    else: #file 
        file = open(filename, 'r')
        retJson.append(json.loads(file.read()))
        file.close()
    return retJson


def load_top_artist(filename, isDB):
    
    sql = "select jsonData, id from fmDump where act_type=2"
    jsobj = load_source(filename, isDB, sql)
    
    # use pandas. NOTE: Examples seem running on terminal. Not from .py file. 
    # (Or something changed on Panda...it took me a while to figure out...)
    # If want to show data whilt execution python.exe, always embed DataFrame
    # with print(), but padnas adjust data according to view. Much would be lost.
    # Therefor I export as csv to verify the output 

    listobj = [pd.DataFrame(r['artists']['artist']) for r in jsobj]
    df = pd.concat(listobj)
    fSave = 'data1.csv'
    df.head(20).to_csv(fSave)
    print("{}, first 20 records as sample".format(fSave))
    
    fSave = 'data2.csv'
    df = df.drop('image', axis=1)
    df.info()
    df.describe().to_csv(fSave)
    print("{}, dataset description".format(fSave))
    
    fSave = 'data3.csv'
    df = df.drop_duplicates().reset_index(drop=True)
    df.describe().to_csv(fSave)
    print("{}, dataset description after drop_duplecate".format(fSave))
    
    sql = "select jsonData, id from fmDump where act_type=6"
    jslist = load_source(filename, isDB, sql)
    fSave = 'data8.csv'
    df2 = pd.DataFrame(jslist[0])
    print(df2.head(5))
    df2 = df2['tags'].copy()
    dflist = df2.values.tolist()
    df['tage'] = dflist
    print(df.head(5))
    df.head().to_csv(fSave)

def get_unique(filename):
    sql = "select jsonData, id from fmDump where act_type=2"
    jsobj = load_source(filename, True, sql)
    listobj = [pd.DataFrame(r['artists']['artist']) for r in jsobj]
    df = pd.concat(listobj)
    df = df.drop('image', axis=1)
    df = df.drop_duplicates().reset_index(drop=True)
    return df[["name","playcount"]].copy()
    
def parse_topTags( filename ):
    sql = "select jsonData, id from fmDump where act_type=4"
    jsobj = load_source(filename, True, sql)
    for rec in jsobj:
        tags = [t['name'] for t in rec['toptags']['tag'][:3]]
        print("First 3 tags {}".format(", ".join(tags)))

def test_change_direction(filename ):
    sql = "select jsonData, id from fmDump where act_type=6"
    jsobj = load_source(filename, True, sql)
    print(jsobj[0])
    df = pd.DataFrame(jsobj[0])
    print(df.head(2))
    
