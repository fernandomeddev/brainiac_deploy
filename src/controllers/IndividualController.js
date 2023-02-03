require('dotenv');
const express = require("express");
const router = express.Router();
const authSecret = process.env.SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const IndividualModel = require('../models/IndividualModel');

function generateToken(params = {}) {
    return jwt.sign(params, authSecret, {
        expiresIn: 86400,
    });
};

router.post('/signup', async (request, response) => {
    try {
        const { name, email, password, confirm_password: confirmPassword, isAdmin="false" } = request.body;

        if (!name) return response.json({ message: 'name is required!' });
        if (!email) return response.json({ message: 'name is required!' });
        if (password !== confirmPassword) return response.json({message: 'passwords do not match'});
        
        const individual = await IndividualModel.findOne({ email: email });
        if (individual) return response.json({ message: 'user already exists!' });

        const data = {
            ...request.body
        };

        const newIndividual = await IndividualModel.create(data);

        return response.status(200).json({ data: newIndividual });
    } catch (error) {
        if(error) return response.status(500).json({ message: 'sorry... try again later'});
    }
});

router.post('/signin', async (request, response) => {
    try {
        const {email, password } = request.body;
        const individual = await IndividualModel.findOne({ email }).select('+password')

        if (!individual) return response.status(400).send({ error: 'User not found!'})  
        if(!await bcrypt.compare(password, individual.password)) return response.status(400).send({erro: 'Invalid password'})
            
        individual.password = undefined;

        const token = jwt.sign({ id: individual.id }, authSecret, {
            expiresIn: 86400,
        });

        response.send({ 
            individual, 
            token: generateToken({ id: individual.id }),
        });
    } catch (error) {
        if(error) return response.status(500).json({ message: 'sorry... try again later'});  
    }
});

module.exports = app => app.use('/auth', router);

