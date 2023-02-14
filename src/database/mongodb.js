const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const mongoose = require('mongoose');
let serverConection = false;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.oddb3.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => {
        serverConection = true;
        console.log('connected!')
    })
    .catch(e => {
        const error = { status: 500, message: 'não foi possivel se conectar aos nossos servidores, tente novamente mais tarde' }

        console.log('\x1b[41m%s\x1b[37m', error.message, '\x1b[0m' + e)
        // connection updating your IP:Adress in network section on atlas, in your cluster.
    })

module.exports = mongoose;