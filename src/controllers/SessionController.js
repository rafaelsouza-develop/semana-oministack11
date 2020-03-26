const connection = require('../database/connections');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken'); 

module.exports = {
     /*async create(request, response) {
         const { id }  = request.body;

         const ong = await connection('ongs').where('id', id).select('name').first();
        
         if(!ong)
         return response.status(400).json({ error: "No ONG found with this Id"})

         return response.json(ong)
        },*/

        async create(request, response){
            const {email, password} = request.body
        
            try {
                const ong = await connection('ongs').where('email', email).select('*').first();
        
            if (!ong)
                return response.status(400).send({ error: 'user not found'})
        
            if(!await bcrypt.compare(password, ong.password))
                return response.status(400).send({ error: 'invalid password'})
        
                ong.password = undefined
        
                const token = jwt.sign({ id: ong.id}, authConfig.secret, {
                    expiresIn: 86400
                })
                return response.send({ong, token})

            } catch (error) {
                console.log(error)
            }

            
        }
}