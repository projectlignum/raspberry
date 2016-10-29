from random import randint, randrange
from time import sleep
from sys import stdout as out

while True:
    if randint(0, 1):
        out.write(str(randrange(5, 30)))
        out.flush()

    sleep(3)
