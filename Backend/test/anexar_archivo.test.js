const request = require('supertest');
const app = require('../../app');

describe('/POST anexar archivo', () => {
  it('responde con un archivo', async () => {
    const res = await request(app)
      .post('/anexar_archivo')
      .attach('archivo', './test/test.txt')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toHaveProperty('archivo');
  }
  );
});