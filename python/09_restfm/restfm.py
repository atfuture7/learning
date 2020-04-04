import sys, argparse

import mod_db, mod_conn, mod_parse

sys.path.insert(1, '../../data')
from fmdata import API_KEY

strStepInfo='''action step, 0 init, 1 data analyze for chart.topArtist, 2 connect-top artist 
 ,3 testing funtion , 4 connet-top tag, 5 data analyze for artist.topTag
 ,6 load tags for all artists
'''

# reference from https://levelup.gitconnected.com/the-easy-guide-to-python-command-line-arguments-96b4607baea1
parser = argparse.ArgumentParser()
parser.add_argument("-s", "--step" ,help=strStepInfo ,choices=range(7), required=True, type=int)
parser.add_argument("-i", "--input" ,help="file name for load" ,type=str)
parser.add_argument("-o", "--output",help="file name for dump" ,type=str)
parser.add_argument("-m", "--maxPage",help="page limit, default 1" ,type=int)
parser.add_argument("-db", "--dbFile",help="database file" ,type=str)
args = parser.parse_args()


# argparse seems to use long optioin as argument member name if exists
if args.step == 0:
    # prepare
    if args.dbFile:
        mod_db.init_db( args.dbFile )
        
    
elif args.step == 1:
    if args.input:
        mod_parse.load_top_artist( args.input, False)
    elif args.dbFile:
        mod_parse.load_top_artist( args.dbFile, True)
    else:
        print("No filename provided")
    
elif args.step == 2:
    # connection
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
    if args.dbFile:
        #mod_db.test_db('jsondata.txt', args.dbFile)
        #mod_db.test_db_add_column(args.dbFile)
        mod_parse.test_change_direction(args.dbFile)
        pass
elif args.step == 4:
    if args.dbFile and args.input:
        mod_conn.query_tag(API_KEY, args.dbFile, args.input, True, 4)
elif args.step == 5:
    if args.dbFile:
        mod_parse.parse_topTags(args.dbFile)
elif args.step == 6:
    if args.dbFile:
        mod_conn.query_tags_for_all(API_KEY, args.dbFile)
    pass


   
print(args.step)

print("test end")


