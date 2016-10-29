'use strict';

const ProximitySensor   = require('./lib/proximity-sensor');
const CameraShooter     = require('./lib/camera-shooter');
const Say               = require('say');

let camera = new CameraShooter();
let env = process.env.NODE_ENV || 'development';

const sensorConfiguration = require('./configuration/sensor')[env];

new ProximitySensor(sensorConfiguration.filename).on('crash', distance => {
    camera.shoot().then(() => Say.speak(
        `There's an obstacle near to you. It's ${distance} metres away.`
    ) && console.log(
        `There's an obstacle near to you. It's ${distance} metres away.`
    )).catch(error => console.error(error));
});
