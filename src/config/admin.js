const Individual = require('../models/IndividualModel');

module.exports = async (req, res, next) => {
    
    const individual = await Individual.findById(req.params.adminId);

    if(!individual.isAdmin) return res.status(401).send({ error: 'acess deined!'})

    return next();
}