
const crypto = require('crypto');
const connectDb = require('../database/connection');

module.exports = {
  async create(req, resp){
    const{ name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
 
    await connectDb('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
     });
 
    return resp.json({ id });
  },

  async index(req, resp){
    const ongs = await connectDb('ongs').select('*');

    return resp.json(ongs)
  }
}