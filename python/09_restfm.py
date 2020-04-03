import sys, argparse, requests, json

sys.path.insert(1, '../data')
from fmdata import API_KEY

def jprint(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

def query_rest(key, args):
    if args.output == None: 
        print("no output file")
        return;
        
    file = open(args.output, "a")
    url = 'http://ws.audioscrobbler.com/2.0/'
    paramload = {
        'method': "chart.gettopartists",
        'api_key' : API_KEY,
        'format' : 'json'
    }
    r = requests.get(url, params=paramload )
    print("REST status:"+ str(r.status_code))
    file.write( json.dumps( r.json())) 
    file.close()

def load_josn(filename):
    if filename == None:
        print("no input file")
        return
    file = open(filename, 'r')
    jsobj = json.loads(file.read())
    file.close()
    jprint(jsobj['artists']['@attr'])
    

# reference from https://levelup.gitconnected.com/the-easy-guide-to-python-command-line-arguments-96b4607baea1
parser = argparse.ArgumentParser()
parser.add_argument("-s", "--step" ,help="action step, 0 init, 1 load, 2 connect "
                    ,choices=[0, 1, 2, 3], required=True, type=int)
parser.add_argument("-i", "--input" ,help="file name for load" ,type=str)
parser.add_argument("-o", "--output",help="file name for dump" ,type=str)
args = parser.parse_args()


# argparse seems to use long optioin as argument member name if exists
if args.step == 0:
    # prepare
    pass
    
elif args.step == 1:
    load_josn( args.input)
    
elif args.step == 2:
    # connection
    query_rest(API_KEY, args)
    
print(args.step)

print("test end")


