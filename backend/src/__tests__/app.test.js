const request = require('supertest');
const createApp = require('../app');

describe('health check', () => {
  it('returns ok payload', async () => {
    const app = createApp();
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });
});
