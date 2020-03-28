const generateId = require('../utils/generateUniqueId');
const connectDb = require('../database/connection');

module.exports = {
  async create(req, resp){
    const{ name, email, whatsapp, city, uf } = req.body;
    const id = generateId();
 
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