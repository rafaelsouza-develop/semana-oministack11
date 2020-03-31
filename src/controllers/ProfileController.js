const connection = require('../database/connections');


 
module.exports = {

    async index(request, response) {

        const user_id = request.headers.authorization;

        const pets = await connection('pet')
        .where('user_id', user_id)
        .select('*')

        return response.json({pets})
     }
};

