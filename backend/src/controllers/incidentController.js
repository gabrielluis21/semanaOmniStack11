const connectDb = require('../database/connection');

module.exports = {
    async create(req, resp){
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [ id ] = await connectDb('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return resp.json({ id })
    },

    async index(req, resp){ 
        const { page = 1 } = req.query;

        const [ count ] = await connectDb('incidents').count()

        const incidents = await connectDb('incidents').join('ongs', 'ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page -1) *5)
            .select(['incidents.*', 
            'ongs.name', 'ongs.email','ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        resp.header('X-Total_count', count['count(*)'])
        return resp.json(incidents);
    },
    
    async delete(req, resp){ 
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connectDb('incidents').select('*')
            .where('id', id)
            .select('ong_id').first();

        if(incident.ong_id != ong_id){
            return resp.status(401).json({error: 'Operation not permitted. '});
        }

        await connectDb('incidents').where('id', id).delete();

        return resp.status(204).send();
    },

}