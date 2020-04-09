# 20200403 Startup file
# Calling Last.fm REST API as client
import sys, argparse

import mod_db, mod_conn, mod_parse

sys.path.insert(1, '../../data')
from fmdata import API_KEY

# argparse is useful
# this is the message of argument --step
strStepInfo='''action step, 0 init, 1 data analyze for chart.topArtist, 2 connect-top artist 
 ,3 testing funtion , 4 connet-top tag, 5 data analyze for artist.topTag
 ,6 load tags for all artists
'''

# arguments expected 
# reference from https://levelup.gitconnected.com/the-easy-guide-to-python-command-line-arguments-96b4607baea1
parser = argparse.ArgumentParser()
parser.add_argument("-s", "--step" ,help=strStepInfo ,choices=range(7), required=True, type=int)
parser.add_argument("-i", "--input" ,help="file name for load" ,type=str)
parser.add_argument("-o", "--output",help="file name for dump" ,type=str)
parser.add_argument("-m", "--maxPage",help="page limit, default 1" ,type=int)
parser.add_argument("-db", "--dbFile",help="database file" ,type=str)
args = parser.parse_args()

# process arguments base on --step    
# argparse seems to use long optioin as argument member name if exists
if args.step == 0:
    # prepare
    if args.dbFile:
        mod_db.init_db( args.dbFile )
        
elif args.step == 1:
    # show record of Last.fm's chart.gettopartists
    if args.input:
        mod_parse.load_top_artist( args.input, False)
    elif args.dbFile:
        mod_parse.load_top_artist( args.dbFile, True)
    else:
        print("No filename provided")
    
elif args.step == 2:
    # connection, call Last.fm's API
    # chart.gettopartists
    iMax = args.maxPage or 1
    if args.output:
        mod_conn.query_rest(API_KEY, args.output, iMax, False)
    elif args.dbFile:
        mod_conn.query_rest(API_KEY, args.dbFile, iMax, True)
        # db.commit() is not written in https://www.sqlitetutorial.net/sqlite-python/ 
        # check real data out of insert function
        mod_db.check_count( args.dbFile)
    else:
        print("No filename provided")

elif args.step == 3:
    # testing area
    if args.dbFile:
        #mod_db.test_db('jsondata.txt', args.dbFile)
        #mod_db.test_db_add_column(args.dbFile)
        mod_parse.test_change_direction(args.dbFile)
        pass

elif args.step == 4:
    # connection, call Last.fm's API 
    # artist.getTopTags for one artist
    if args.dbFile and args.input:
        mod_conn.query_tag(API_KEY, args.dbFile, args.input, True, 4)

elif args.step == 5:
    # show records of Last.fm's artist.getTopTags
    if args.dbFile:
        mod_parse.parse_topTags(args.dbFile)

elif args.step == 6:
    # connection, call Last.fm's API 
    # artist.getTopTags for all artists from chart.gettopartists
    if args.dbFile:
        mod_conn.query_tags_for_all(API_KEY, args.dbFile)
    pass


   
print(args.step)

print("test end")


# 20200404 complete

# The first version is using save-file. 
# Following the tutorial, this program was expected to make thousands 
# of API requests, database would be a better choice. 

# This is v.2 which uses database. 
# And only made 10 API calls, in precise. Since I only need to prove 
# the design/architecture is working, and there were 50 records expected 
# in one call, 500 records are enough for testing. (--step 4 and later do
# not provide save-file alternation.)
# v.2 also expand original 1-file-program to 4-file-peoject
# startup/ SQLite/ RESTful API/ visualization

# step 3 is testing area.
# In tutorial, there were manual steps and programmed processes. I 
# raised all steps to programmed processes. Automation saves time. 

# API_KEY was store outside the project, and used sys.path.insert() to 
# find the location.

# The final product of this project is --step 1 
# restructure the data retrieved from Last.fm  (10+500 calls)

# 20200409 update comments