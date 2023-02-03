const mongoose = require('../database/mongodb');
const bcrypt = require('bcryptjs');

const IndividualSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select:false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    creatAt:{
        type: Date,
        default:Date.now,
    }

});

IndividualSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const IndividualModel = mongoose.model('Individual', IndividualSchema);

module.exports = IndividualModel;