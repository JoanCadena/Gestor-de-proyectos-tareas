const request = require('supertest');
const app = require('../app');

describe("TDD compromisos", () => {
    it("get que tin", async () => {
        await request(app).get('/compromiso')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)});
    });