const request = require('supertest');
const app = require('../../src/app');
const connectDB = require('../../src/database/connection');

describe('Incident', () => {
  beforeEach(async ()=>{
    await connectDB.migrate.rollback();
    await connectDB.migrate.latest();
  });

  afterAll(async ()=>{
    await connectDB.destroy();
  });

  it('should be able to create a new Incident', async () => {
    const response = await request(app)
     .post('/incidents')
     .set('Authorization', '53f87dff')
     .send({
      title: "caso 55",
      description: "Detalhes do caso",
      value: 120
    });

    expect(response.body).toHaveProperty('id');
  });
  
  it('should be able to list all Incidents', async () => {
    const response = await request(app).get('/incidents');

    expect(response.status).toBe(200);

  });

  it('should be able to delete a Incident', async () =>{
    const response = await response(app)
     .delete('/incidents/1').set('Authorization','53f87dff');
    
    expect(response.status).toBe(204);
    expect(response.headers).toHaveProperty('X-Total_count')
  });
  
});
