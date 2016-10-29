'use strict';

const spawn         = require('child_process').spawn;
const EventEmitter  = require('events').EventEmitter;

module.exports = class ProximitySensor extends EventEmitter {
    constructor(file) {
        super();
        let sensor = spawn('python', [ file ]);

        sensor.stdout.on(
            'data', data => this.emit('crash', Number(data.toString()))
        );
        sensor.stderr.on('data', data => this.emit('error', data));
        sensor.on('close', () => this.emit('close'));
    }
};
