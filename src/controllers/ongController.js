const connection = require('../database/connections');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(request, response)  {

        try {
            const ongs = await connection('ongs').select('*');
    
            return response.json({ ongs })
                
        } catch (err) {
            console.log(err)
        }
    
    },
    
    async  create(request, response) {
        try {
            let { name, email, password , whatsapp, city, uf } = request.body;
       
        const id = crypto.randomBytes(4).toString('hex');
        const hash = await bcrypt.hash(password, 10);
        password = hash
        
            await connection('ongs').insert({
                id,
                name,
                email,
                password,
                whatsapp,
                city,
                uf,
            })
        
            
        return response.json({ id })
        } catch (error) {
            console.log(error)
        }
        
    }
};