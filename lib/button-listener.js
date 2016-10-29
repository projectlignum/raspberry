'use strict';

const rpio          = require('rpio');
const EventEmitter  = require('events').EventEmitter;

module.exports = class ButtonListener extends EventEmitter {
    constructor(pin) {
        super();

        this.BUTTON = pin;
        this.waiting = false;

        rpio.open(this.BUTTON, rpio.INPUT);

        rpio.poll(this.BUTTON, () => {
            if(!this.waiting && rpio.read(this.BUTTON) === rpio.HIGH) {
                this.waiting = true;
                setTimeout(() => (this.waiting = false), 1000);
                this.emit('click');
            }
        }, rpio.POLL_HIGH);
    }
};
