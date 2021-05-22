const mongoose = require('mongoose');
const newuser = mongoose.model('newuser', {
    Usuario: {
        type: String,
        required: true,
    },
    Pass: {
        type: String,
        required: true,
    },
    Correo:{
        type: String,
        required: true,
    },
    Alta: {
        type: String,
        required: true,
    },
})

module.exports = newuser;
