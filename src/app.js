require('dotenv').config();

const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const routes = require('./routes');
const {errors} = require('celebrate');
const path = require('path')

const app = express();



/**
 * {origin: "url que pode acessar a aplicaçao"}
 */
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(errors());




module.exports = app
