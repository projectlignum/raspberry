'use strict';

const Agent = require('supertest-as-promised');

module.exports = class ImageIdentifier {
    constructor(endpoint) {
        this.agent = new Agent(endpoint);
    }

    identify(file) {
        console.log(file);
        return (this.agent
            .post('/images')
            .attach('file', file)
        ).expect(200);
    }
};
