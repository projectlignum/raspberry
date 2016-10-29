'use strict';

const ButtonListener    = require('./lib/button-listener');
const ProximitySensor   = require('./lib/proximity-sensor');
const CameraShooter     = require('./lib/camera-shooter');
const ImageIdentifier   = require('./lib/image-identifier');
const Say               = require('say');

let camera = new CameraShooter();
let env = process.env.NODE_ENV || 'development';

const sensorConfiguration = require('./configuration/sensor')[env];
const apiConfiguration = require('./configuration/api')[env];

let imageIdentifier = new ImageIdentifier(apiConfiguration.endpoint);

new ProximitySensor(sensorConfiguration.filename).on('crash', distance => {
    return camera.shoot().then(file => imageIdentifier.identify(file).then(
        categories => console.log(categories) && Say.speak(
            `There's an obstacle near to you. It's ${distance} centimetres away.
            It may be a ${categories[0]}
            `
        ).catch(error => console.error(error))
    ).catch(console.error) );
});

new ButtonListener(10).on('click', () => {
    return camera.shoot().then(file => imageIdentifier.identify(file).then(
        categories => console.log(categories) && Say.speak(
            `There's something near to you. It may be a ${categories[0]}`
        ).catch(error => console.error(error))
    ).catch(console.error) );
});
