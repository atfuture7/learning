# 20200403 
# Client of REST API
import requests, time, json
from IPython.core.display import clear_output
import pandas as pd
from tqdm import tqdm
import mod_db, mod_parse

# send a call to REST API, return received data
# parameters are all defined in the calling function
def query_to_lastfm( paramload):
    url = 'http://ws.audioscrobbler.com/2.0/'
    r = requests.get(url, params=paramload )
    sInfo = "REST status:"+  str(r.status_code)
    if "page" in paramload:
        sInfo += " at page " +  str(paramload["page"])

    print(sInfo)
    return r.json()

# use hancle to unify actions for save-file and query-db
def get_handle(fname, isDB):
    handle = None
    if isDB:
        handle = mod_db.create_connection(fname)
    else: #file
        handle = open(fname, "a")
    return handle

# both file and db-conn have close()
def close_handle( handle):
    handle.close()
    
    
# store data 
def dump_data(handle, jsObj, isDB, actId):
    sData = json.dumps( jsObj )
    print(sData)
    if isDB:
        sData = sData.replace("'", r"\'")
        sql = "insert into fmDump (jsonData, act_type) values (?, ?) "
        cur = handle.cursor()
        cur.execute(sql, (sData,actId))
        handle.commit()
            
    else: #file
        handle.write( sData ) 

# query Last.fm for chart.gettopartists
# build parameters here. 
# ref: https://www.last.fm/api/show/chart.getTopArtists
def query_rest(key, filename, iMax, isDB):
    if filename == None: 
        print("no output file")
        return
        
    storage = get_handle(filename, isDB)
    
    paramload = {
        'method': "chart.gettopartists",
        'api_key' : key,
        'format' : 'json'
    }
    iMax += 1 
    for i in range(1, iMax):
        paramload["page"] = i
        jsObj = query_to_lastfm( paramload )
        # test data
        #jsObj = json.loads('["foo", {"bar":["baz", null, 1.0, 2]}]')
        dump_data(storage, jsObj, isDB, 2)
        clear_output(wait=True)
        time.sleep(2)

    close_handle(storage)

# query Last.fm for artist.getTopTags
# build parameters here. 
# ref: https://www.last.fm/api/show/artist.addTags
def query_tag(key, filename, artist, isDB, idStep):
    jsObj = None
    paramload = {
        'method': "artist.getTopTags",
        'api_key' : key,
        'format' : 'json',
        "artist": artist
    }
    #print(paramload)
    jsObj = query_to_lastfm( paramload )
    if idStep == 4:
        # on step 4, store raw data to db. 
        storage = get_handle(filename, isDB)
        dump_data(storage, jsObj, isDB, idStep)
        close_handle(storage)
    elif idStep == 6:
        # on step 6, only first 3 tags required. 
        # lesve it to the calling function 
        return jsObj

# itinerant function, called by tqdm (sams as pandas.apply)
# this function calls REST API, and need to slow the itinerant speed.
def semi_load(strname, *argv):
    # [test] make sure parameters passed in are correct
    # print("artist: {}, key:{}, file:{}".format(strname, argv[0], argv[1]))
    jsObj = query_tag(argv[0], argv[1], strname, True, 6)
    tags = [t['name'] for t in jsObj['toptags']['tag'][:3]]
    time.sleep(2)
    return ", ".join(tags)
    
# query top tags for all artists in database
# I tried hard to avoid mass-call, but with only 10 pages, there are 500 artists
def query_tags_for_all(key, filename):
    # use mod_parse to get unique name list
    dataf = mod_parse.get_unique(filename)
    # setup tqdm progress bar
    tqdm.pandas()
    print(dataf.head(5))

    dataf['tags'] = dataf["name"].progress_apply(semi_load, args=(key, filename))
    dataf.to_csv('data6.csv')   # log for check
    strJson = dataf.to_json()   # this was a mistake, but I keep it
    # to_json( orient='records') is a better version. more describes in mode_parse
    storage = get_handle(filename, True)
    dump_data(storage, json.loads(strJson), True, 6)
    close_handle( storage)

# 20200404 completed
# this module is mainly for REST API, storing data and frequency control

#20200409 update comments 