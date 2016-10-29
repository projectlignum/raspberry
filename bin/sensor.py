import RPi.GPIO as GPIO
from time import sleep
from sys import stdout as out

try:
    GPIO.setmode(GPIO.BOARD)

    TRIG = 23
    ECHO = 24

    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)

    while True:
        pulse_start = pulse_end = 0

        GPIO.output(TRIG, False)

        time.sleep(0.000002)

        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)
        time.sleep(0.000002)

        while GPIO.input(ECHO) == 0:
            pulse_start = time.time()

        while GPIO.input(ECHO) == 1:
            pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start

        distance = pulse_duration * 17150

        distance = round(distance, 2)

        if distance > 0 and  distance < 100:
            out.write(str(distance))
            out.flush()
        sleep(3)

except KeyboardInterrupt:
    GPIO.cleanup()