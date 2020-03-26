const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

/**
 * {origin: "url que pode acessar a aplicaçao"}
 */
app.use(cors({
    origin: "https://bethehero-frontend.herokuapp.com/"
}));
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333)