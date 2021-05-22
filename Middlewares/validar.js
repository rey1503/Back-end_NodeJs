const jwt = require('jsonwebtoken');
let verificarAuth = (req, res, next) => {
  let token =  req.get('token');
 // console.log(token)
  jwt.verify(token, 'xpd', (err, decoded) => {
    if(err) {
      return res.status(404).json({
        mensaje: 'Error de token',
        err
      })
    }
   // let token = req.params.id;
    var decoded = jwt.decode(token, {complete: true});
   //console.log(decoded);
   // console.log(decoded.payload)
    req.usuario = decoded.payload;
    next();

  });

}

module.exports = verificarAuth;