describe('Profile', () => {
  it('should be able to list all incidents of an ONG', async () => {
    const response = await request(app).get('/profile');

    expect(response.status).toBe(200);
  });
});
