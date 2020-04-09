# 20200403 Data visualization
# parse data to desired format
import json
import pandas as pd
import mod_db


# simple output on screen for json data
def jprint(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

# load data from source
def load_source(filename, isDB, sql):
    retJson = []
    if isDB:
        # from database
        jsoblist = []
        conn = mod_db.create_connection(filename)
        cur = conn.cursor()
        #sql = "select jsonData, id from fmDump"
        print(sql)
        cur.execute(sql)

        # store data as a list of json object
        rows = cur.fetchall()
        for row in rows:
            print("at record id {}".format(row[1]))
            jsstr = row[0].replace("\\'", r"'")
            jsobj = json.loads(jsstr)
            jsoblist.append(jsobj)
        retJson = jsoblist
        conn.close()
    else: 
        # from file 
        file = open(filename, 'r')
        retJson.append(json.loads(file.read()))
        file.close()
    return retJson

# --step 1, load top artist 
def load_top_artist(filename, isDB):
    
    sql = "select jsonData, id from fmDump where act_type=2"
    jsobj = load_source(filename, isDB, sql)
    
    # use pandas. NOTE: Examples seem running on terminal. Not from .py file. 
    # (Or something changed on Panda...it took me a while to figure out...)
    # If want to show data whilt execution python.exe, always embed DataFrame
    # with print(), but padnas adjust data according to view. Much would be lost.
    # Therefor I export as csv to verify the output 

    # decode json structure
    listobj = [pd.DataFrame(r['artists']['artist']) for r in jsobj]
    df = pd.concat(listobj) # combine a list of json object
    fSave = 'data1.csv'     
    df.head(20).to_csv(fSave)
    # [test] save first 29 records for debug reference
    print("{}, first 20 records as sample".format(fSave))
    
    fSave = 'data2.csv'
    df = df.drop('image', axis=1)
    df.info()
    df.describe().to_csv(fSave)
    # [test] save DataFrame desctiption after drop col:image
    print("{}, dataset description".format(fSave))
    
    fSave = 'data3.csv'
    df = df.drop_duplicates().reset_index(drop=True)
    df.describe().to_csv(fSave)
    # [test] save DataFrame desctiption after drop duplicate
    print("{}, dataset description after drop_duplecate".format(fSave))
    
    # merge tag back to artist list
    sql = "select jsonData, id from fmDump where act_type=6"
    jslist = load_source(filename, isDB, sql)
    fSave = 'data8.csv'
    df2 = pd.DataFrame(jslist[0])   # only one record
    print(df2.head(5))              # The table view is correct
    df2 = df2['tags'].copy()        # But the axis is based on column, bot on records. 
    dflist = df2.values.tolist()    # Merge 2 DataFrame, the new coluemns are blank
    df['tage'] = dflist             # Then I output tags column as a list
    print(df.head(5))
    df.head().to_csv(fSave)     # final product of this project

# get artist list with no duplication
# same as first part of load_top_artist()
def get_unique(filename):
    sql = "select jsonData, id from fmDump where act_type=2"
    jsobj = load_source(filename, True, sql)
    listobj = [pd.DataFrame(r['artists']['artist']) for r in jsobj]
    df = pd.concat(listobj)
    df = df.drop('image', axis=1)
    df = df.drop_duplicates().reset_index(drop=True)
    return df[["name","playcount"]].copy()
    
# [test] test of retrieve tags from json list    
def parse_topTags( filename ):
    sql = "select jsonData, id from fmDump where act_type=4"
    jsobj = load_source(filename, True, sql)
    for rec in jsobj:
        tags = [t['name'] for t in rec['toptags']['tag'][:3]]
        print("First 3 tags {}".format(", ".join(tags)))

# [test] try to change the orientation of data store as --step 6
# but the view in DataFrame is correct....
# So I abandan this attemot, and keep the merge fail because of 
# axis setting as reference. 
def test_change_direction(filename ):
    sql = "select jsonData, id from fmDump where act_type=6"
    jsobj = load_source(filename, True, sql)
    print(jsobj[0])
    df = pd.DataFrame(jsobj[0])
    print(df.head(2))
    

# 20200404 completed
# While working with web system, there are always issues about 
# data parsing. Either done by tools or by the developer. 