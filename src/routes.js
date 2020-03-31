const express = require('express');
const { celebrate, Segments, Joi} = require('celebrate');
const multer = require('multer');
const multerConfig = require('../src/config/multer')

const authMiddleware = require('../src/middlewares/auth'); 

const UserController = require('./controllers/UserController')
const PetsController = require('./controllers/PetsController');
const ProfileController = require ('./controllers/ProfileController')
const SessionControler = require('./controllers/SessionController')
const PhotosController = require('./controllers/PhotosController')

const router = express.Router();



router.post('/user',celebrate({
    [Segments.BODY]:  Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string()
        .required()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
        .error(new Error('Senha deve conter, números, letras maiusculas e minusculas e caracteres especiais.')),
        telefone: Joi.string().required().length(11).error(new Error('Telefone deve conter DDD e incluir o 9 no inicio.')),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),  UserController.create);


router.post('/pet', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3).error(new Error('Nome deve conter ao menos 3 letras.')),
        hairColor: Joi.string().required().error(new Error('Cor da pelagem é obrigatoria.')),
        size: Joi.string().required().error(new Error('Porte do seu pet é obrigatorio.')) ,
        breed: Joi.string().required().error(new Error('Raça do seu pet é obrigatoria, use (SRD) caso ele não tenha raça definida.'))
    })
    
}), PetsController.create)
router.get('/pet', PetsController.index)
router.delete('/pet/:id', PetsController.delete) 



router.get('/profile', ProfileController.index)


router.post('/session', SessionControler.create)


router.post('/photos', multer(multerConfig).single('file'), PhotosController.uploadPhotosPet)
router.get('/photos', PhotosController.listPhotos)
router.delete('/photos/:id',PhotosController.deletePhotos)




module.exports = router
