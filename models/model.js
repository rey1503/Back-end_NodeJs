const mongoose = require('mongoose');
const rfc = mongoose.model('RFC',{
    RFC:{ type: String,
        required: true,}, 
    Rs: { type: String,
        required: true,},
    Correo: { type: String,
        required: true,},
    Dis:{ type: String,
        required: true,},
    Fech:{ type: String,
        required: true,}
})

module.exports = rfc;