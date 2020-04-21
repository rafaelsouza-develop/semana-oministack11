const connection = require('../database/connections');

module.exports = {
    
    async uploadPhotosPet(request, response){
        const { originalname: name, size, key, location: url= ''} = request.file;
        const pet_id = request.headers.authorization;
    
        console.log(pet_id)
        console.log(request.file)
       
        
        try {
            const [id] =   await connection('photos').insert({
                name,
                size,
                key,
                url,
                pet_id: 1

            });

            const photo = await connection('photos')
                .where('id', id)
                .select('*')

        console.log(request.file)
        return response.json({photo})
        } catch (error) {
            console.log(error)
        }
    },
    async listPhotos(request, response)  {
        
        const pet_id = request.headers.authorization;

        try {
            const photos  = await connection( 'photos')
                                    .where('pet_id', pet_id)
                                    .select('*')

            return response.json(photos)

        } catch (error) {
            console.log(error)
        }
    },

    async deletePhotos(request, response){
        const { id } = request.params;
         
        const pet_id = await request.headers.authorization;
        
        try {
            const photo = await connection('photos')
                .where('id', id)
                .select('pet_id')
                .first();

            if(photo.pet_id !== pet_id){
                return response.status(401).json({error: "Não foi possivel deletar a foto."})
                }

            await connection('photos').where('id', id).delete();

            return response.status(204).send();
        
        } catch (error) {
            console.log(error)
        }
        

         
    },

    async testeArduino(request, response) {
        console.log(body)
        const { data1, data2 } = request.body;

        if(data1){
            console.log(data1)
        }

        if(data2){
            console.log(data2)
        }

        return response.send()
    }
}