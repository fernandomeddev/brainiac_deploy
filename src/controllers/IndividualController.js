const express = require("express");
const router = express.Router();
const IndividualModel = require('../models/IndividualModel');

/* router.post('/individual', async (request, response) => {
    try {
        const { name, email } = request.body;

            if (!name) return response.json({ message: 'name is required!' });
            if (!email) return response.json({ message: 'name is required!' });
            
            const individual = await IndividualModel.findOne({ email: email });

            if(individual) {
                return response.json({ message: 'user already exists!'});
            };

            const data = {
               name,
               email
            };

            const newIndividual = await IndividualModel.create(data);

            return response.status(200).json({ data: newIndividual });
    } catch (error) {
        return response.send(error)
    }
}); */

router.get('/individual', async (request, response) => {
    try {
        const individuals = await IndividualModel.find();

        if(!individuals){
            return res.status(404).send('list is empty or not found')
        }

        return response.json({ data: individuals });

    } catch (error) {
        return response.send(error)
    }
});

module.exports = app => app.use('', router);
