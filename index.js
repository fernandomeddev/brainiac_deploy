require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('./src/swagger.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



const consign = require('consign')
require('./src/database/mongodb')

consign()
    .then('./src/config/middlewares.js')
    .then('./src/controllers')
    .into(app)

app.get("/terms", (req, res) => {
    return res.json({
        message: "Termos de Serviço"
    })
})

app.listen(3333, () => {
    
    console.log('Api Rodando.');
});
