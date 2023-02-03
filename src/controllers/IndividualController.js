require('dotenv');

const express = require("express");
const authSecret = process.env.SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
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
        return response.send(error);
    }
});


router.post('/signin', async (request, response) => {
    const {email, password } = request.body;

    const user = await IndividualModel.findOne({ email }).select('+password')

    if (!user) 
        return res.status(400).send({ error: 'User not found!'})

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({erro: 'Invalid password'})

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authSecret, {
        expiresIn: 86400,
    });

    response.send({ 
        user, 
        token: generateToken({ id: user.id }),
    });
});

module.exports = app => app.use('/auth', router);

