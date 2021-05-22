const mongoose = require('mongoose');
const usuario=process.env.USERMONGO;
const con=process.env.PASSMONGO;
mongoose.connect('mongodb+srv://'+usuario+':'+con+'@cluster0.bwhvb.mongodb.net/xpd?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
