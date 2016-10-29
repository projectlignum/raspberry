'use strict';

const Webcam = require('node-webcam');

module.exports = class CameraShooter {
    constructor(width = 1280, height = 720, quality = 100, output = 'jpeg') {
        this.camera = Webcam.create({
            width: width,
            height: height,
            quality: quality,
            output: output
        });
    }

    shoot(filename = `static/${Date.now()}`) {
        return new Promise(res => this.camera.capture(filename, res));
    }
};
