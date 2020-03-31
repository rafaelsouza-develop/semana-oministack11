const connection = require('../database/connections');
const jwt = require('jsonwebtoken')

module.exports = {

    async index(request, response) {

        const { page = 1} = request.query;
        const [ count ] = await connection('pet').count()
        const pets = await connection('pet')
        .join('pet', 'user.id', "=", "pets.user_id")
        .limit(10)
        .offset((page -1) * 10)
        .select([
            'incidents.*',
              'user.name',
               'user.telefone',
                'user.email',
                 'user.city',
                  'user.uf']);
        response.header('X-Total-Count', count['count(*)'])
        return response.json({pets});
    },

    async create(request, response) {
        const { name, hairColor, size, breed} = request.body;
        const user_id = request.headers.authorization;

        

       const [id] = await connection('pet').insert({
                name,
                hairColor,
                size,
                breed,
                user_id
        });

        return response.json({id});
    },
     async delete(request, response) {
         const { id } = request.params;
         
         const user_id = await request.headers.authorization;
         
         const pet = await connection('pet')
         .where('id', id)
         .select('user_id')
         .first();
       
         if(pet.user_id !== user_id){
             return response.status(401).json({error: "Não foi possivel deletar o incidente"})
         }

         await connection('pet').where('id', id).delete();

         return response.status(204).send();
     }

     
};