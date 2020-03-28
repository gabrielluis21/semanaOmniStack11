import { request } from "express";

describe('Session', () => {
  beforeEach(async ()=>{
    await connectDB.migrate.rollback();
    await connectDB.migrate.latest();
  });

  afterAll(async ()=>{
    await connectDB.destroy();
  });

  it('should be able to create a new Session',()=>{
    const response = request(app)
     .post('/session')
     .send({
       id: "53f87dff"
     });
     
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
  });
});
