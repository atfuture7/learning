# test for *arg and **kwargs
#examples from https://book.pythontips.com/en/latest/args_and_kwargs.html

def test_var_args(f_arg, *argv):
	print("first normal arg:", f_arg)
	for arg in argv:
		print("another arg through *argv:", arg)

test_var_args("commonpw123", "python", 'egg', 'test')

def test_kwargs(**kwargs):
    for key, value in kwargs.items():
        print("{0} = {1}".format(key, value))
        
# redesign test, key needs no quote 
test_kwargs(love="ashin#1", act="python", giveMeANum=3)

# failed test 

# *argv doesn't take keyword
# test_var_args(name="abc123", act="python", giveMeANum=3)

# **kwargs doesn't convert positional argument into key-value pairs
# arghs = {"pair": "hash", "name":"valur", "valasnum":5, "name":"abc123"}
# test_kwargs(arghs) 

