const connection = require('../database/connections');
const bcrypt = require('bcryptjs');
const generateUniqueId = require ('../utils/generateUniqueId')

module.exports = {
    async index(request, response)  {

        try {
            const user = await connection('user').select('*');
    
            return response.json({ user })
                
        } catch (err) {
           
        }
    
    },
    
    async  create(request, response) {
        try {
        
        let { name, email, password , telefone, city, uf } = request.body;
            
        const user = await connection('user').where('email', email).select('email').first();

        if(user)
             return response.status(400).json({ message: "Email já cadastrado."})
        
        
        const id = generateUniqueId();
        const hash = await bcrypt.hash(password, 10);
        password = hash
        
        await connection('user').insert({
                id,
                name,
                email,
                password,
                telefone,
                city,
                uf,
            })
        
            
        return response.json({ name })
        } catch (error) {
            
        }
        
    }
};