import os, datetime

fileLocation = 'F:\\picture\\2023\\2306\\life-2022-03-02-1253301.MOV'
creation_datetime = datetime.datetime(2023, 6, 3, 12, 53)

# Showing stat information of file
stinfo = os.stat(fileLocation)
print(stinfo)

print("modified create time: %s" %creation_datetime)

creation_time = creation_datetime.timestamp()
os.utime(fileLocation, (creation_time, creation_time))

# Showing stat information of file
stinfo = os.stat(fileLocation)
print(stinfo)
