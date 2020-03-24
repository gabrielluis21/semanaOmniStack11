const connectDb = require('../database/connection');

module.exports = {
    async create(req, resp){
        const { id } = req.body;

        const ong = await connectDb('ongs').where('id', id).select('name');
        if(!ong){
            return resp.status(400).json({ error:'No Ong found with this ID' });
        }

        return resp.json(ong);
    }
}