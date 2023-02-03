const express = require('express');
const { ObjectId } = require('mongoose');
const authRole = require('../config/auth');
const IndividualModel = require('../models/IndividualModel');

const router = express.Router();

router.use(authRole);

// Update Individual
router.put('/individual_updade/:individual_id', async (request, response) => {
    try {
        const { individual_id: individualId } = request.params;
        
        let data = {
            ...request.body
        }

        console.log(data )

        const updatedIndividual = await IndividualModel.findByIdAndUpdate(individualId, { isAdmin: true });
        if (!updatedIndividual) return response.json({ message: 'updated failed' });

        console.log(updatedIndividual )

        return response.status(200).json({ responseData: updatedIndividual });
    } catch (error) {
        return response.send(error);
    }
});

// List of Individuals
router.get('/list_individual', async (request, response) => {
    try {
        const individual = await IndividualModel.find();
        if (!individual) return response.status(401).send({ error: 'list is empty' });
        
        return response.send({ individual });
    } catch (error) {
        return response.status(400).send({ error: 'Error an loading accounts' });
    };
});

// Informations about specify Individual
router.get('/info_individual/:individual_id', async (request, response) => {
    try {
        const { individual_id: individualId } = request.params;
        const individual = await IndividualModel.findById(individualId);

        if(!individual){
            return response.status(404).send('individual not found')
        }
        
        return response.json({ data: individual });

    } catch (error) {
        return response.send(error)
    }
});

router.delete('/info_individual/:individual_id', async (request, response) => {
    try {
        const { individual_id: individualId } = request.params;
        const individual = await IndividualModel.findById(individualId);
        if (!individual) return response.status(401).json({ message: 'individual not found' });

        const individualDeleted = await IndividualModel.findByIdAndDelete(individualId);

        if(!individualDeleted){
            return response.status(404).send('individual not be deleted');
        }

        return response.json({ data: individual, message: 'individual deleted!' });

    } catch (error) {
        return response.send(error)
    }
});

module.exports = app => app.use('/admin', router);