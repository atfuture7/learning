"""
A python script waiting for user input.
Test docker skeleton
"""

sData = "1"
sExit = "exit" # key-word to exit
while sData != sExit:
  print("Please enter anything. 'exit' to terminate:")
  sData = input()
  print("Received: " + sData)