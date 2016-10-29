'use strict';

const Webcam = require('node-webcam');

module.exports = class CameraShooter {
    constructor(width = 1280, height = 720, quality = 100, output = 'jpeg') {
        this.using  = false;
        this.output = output;
        this.camera = Webcam.create({
            width: width,
            height: height,
            quality: quality,
            output: output
        });
    }

    shoot(filename = `static/${Date.now()}`) {
        if(!this.using) {
            this.using = true;
            return new Promise(res => this.camera.capture(filename, res)).then(filename => {
                this.filename = filename;
                this.using = false;
                return filename;
            });
        } else {
            return new Promise((res, thw) => {
                setTimeout(() => {
                    if(this.using) return thw(new Error('Camera in use'));
                    return res(this.filename);
                }, 500);
            });
        }
    }
};
