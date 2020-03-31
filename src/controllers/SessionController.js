const connection = require('../database/connections');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken'); 


module.exports = {

        async create(request, response){
            const {email, password} = request.body
        
            try {
                const ong = await connection('user').where('email', email).select('*').first();
        
            if (!ong){
                return response.status(400).json({message : 'Usuário não encontrado'})
            }
                
        
            if(!await bcrypt.compare(password, ong.password)){
                return response.status(400).json({message: 'Senha invalida'})
            }
                
        
            ong.password = undefined
        
            const token = jwt.sign({ id: ong.id}, authConfig.secret, {
                expiresIn: 86400
            })
            
            return response.send({ong, token})

            } catch (error) {
               
            }

            
        }
}