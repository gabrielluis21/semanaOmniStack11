const request = require('supertest');
const app = require('../../src/app');
const connectDB = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async ()=>{
    await connectDB.migrate.rollback();
    await connectDB.migrate.latest();
  });

  afterAll(async ()=>{
    await connectDB.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
     .post('/ongs')
     .send({
        name:"APAD",
        email:"contato@test.com",
        whatsapp:"4700000000",
        city:"Rio do Sul",
        uf:"SC"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
  
  it('should be able to list all ONGs', async () => {
    const response = await request(app).get('/ongs');

    expect(response.status).toBe(200);

  });
  
});
