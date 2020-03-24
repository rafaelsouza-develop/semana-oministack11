const express = require('express');
const connection = require('./database/connections');

const OngController = require('./controllers/ongController')
const IncidentsController = require('./controllers/incidentsController');
const ProfileController = require ('./controllers/ProfileController')
const SessionControler = require('./controllers/SessionController')

const router = express.Router();


router.get('/ongs', OngController.index);
router.post('/ongs', OngController.create);


router.post('/incidents', IncidentsController.create)
router.get('/incidents', IncidentsController.index)
router.delete('/incidents/:id', IncidentsController.delete)


router.get('/profile', ProfileController.index)


router.post('/session', SessionControler.create)

module.exports = router
