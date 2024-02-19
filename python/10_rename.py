import os, time
from os import path

path = 'F:\\picture\\2023\\2312'
s_chw = os.getcwd()
s_prefix = 'life'

#####
##

def get_filename(s_prefix, s_ntime, s_ext, icnt=0):
    s_filef='{0}-{1}{2}.{3}'
    s_filename_l = s_filef.format(s_prefix, s_ntime, icnt, s_ext)
    if os.path.exists(s_filename_l):
        s_filename_l = get_filename(s_prefix, s_ntime, s_ext, icnt+1)

    return s_filename_l


##
#####

print(s_chw)
os.chdir(path)


files = os.listdir(path)

s_otime = ''
i_cnt=0


for f in files:
    t_epoc = os.path.getmtime(f);
    print("Last modified: %s" % time.ctime(t_epoc))
    s_ntime = time.strftime('%Y-%m-%d-%H%M%S', time.localtime(t_epoc))

    s_ext = f.split('.')
    s_filename = get_filename(s_prefix, s_ntime, s_ext[-1])
    s_fpath = os.getcwd()
      
    #print('{} === {}'.format(s_fpath+'\\'+f, s_fpath+'\\'+s_filename))
    os.rename(f, s_filename)
    #break

os.chdir(s_chw)
print(os.getcwd())

