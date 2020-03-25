const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

/**
 * {origin: "url que pode acessar a aplicaçao"}
 */
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333)