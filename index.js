const express = require('express');
var xl = require('excel4node');
const verificar = require('./Middlewares/validar');
//const autentic = require('./Middlewares/autentic')
const enigma = require('enigma-code');
const mongoose = require('mongoose');
const cors = require('cors');
const fs= require('fs-extra')
const path= require('path');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const date = require('date-and-time');
const app = express();
require('dotenv').config()
var multer  = require('multer');
//var mysql = require('mysql');
const rfc = require('./models/model');
//const connection = require('./database/sql')
const alta = require('./models/alta');
const { json } = require('body-parser');
const cloudinary = require('./routers/cloudinary')
const newuser = require('./models/newuser')
require('./database/db')
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
const valorEncriptacion = 10
var key = process.env.SECRET;
enigma.genHash(valorEncriptacion,key,'reyhernsjhdaj')
let contador=0;

  var storage = multer.diskStorage({ 
    destination:function(req,file,cb){
    cb(null,'uploads/')
    },
    filename:function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname));
    }
    });
    var upload = multer({ storage: storage,
     fileFilter: function (req, file, cb) {
     cb(null, true);
     }
     });

/*app.get('/consulta', verificar, async(req,res,next) =>{
  const rfc = await connection.query(`SELECT rfc FROM xpd_system.InformacionFiscal` , function(error,result){
if(error){
  throw error
}else{
  var resultado = result;  
 res.json(resultado)}})});

app.get('/respuesta/:id',verificar,async(req,res,next) =>{
  const id = req.params.id;
  const rfc = await connection.query("SELECT rfc,total,email,usuario,xpd_system.InformacionFiscal.razonSocial,fechaDeVenta FROM xpd_system.InformacionFiscal inner join xpd_system.Cliente  ON InformacionFiscal.idInformacionFiscal=Cliente.idInformacionFiscal inner join xpd_system.Venta on Cliente.idCliente=Venta.idCliente inner join xpd_system.Distribuidor on Venta.idDistribuidor=Distribuidor.idDistribuidor where rfc=? order by fechaDeVenta desc LIMIT 1",[id], function(error,result){
if(error){
  return false
  res.status(400).json({
    mensaje: 'Ocurrio un error',
    error
  })
}else{
  var resultado = result;
  if(resultado == ''){
    res.status(400).json({
        mensaje: 'Ocurrio un error'
      })
      return false
  }
 res.json(resultado)
}})});*/
app.post('/reporte',async(req,res,next)=>{
  const id = req.body.fecha;
  const id2 = req.body.fecha2;
  const b = await alta.find({fecha:{$gte:(req.body.fecha),$lte:(req.body.fecha2)}})
  res.json(b)
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('ReporteTicktes');
    var style = wb.createStyle({
       font: {
          color: '#000000',
          size: 10,
       }
      })
    ws.cell(1, 1)
    .string(('No_Ticket'))
    .style(style);
  for (z = 0; z < b.length; z++) {
    ws.cell(z + 2, 1)
    .number(b[z].No_Ticket)
    .style(style);
  }
  ws.cell(1, 2)
  .string(('Se_Comunicó'))
  .style(style);
for (z = 0; z < b.length; z++) {
  ws.cell(z + 2, 2)
  .string(b[z].Se_Comunicó)
  .style(style);
}
ws.cell(1, 3)
.string(('No_Telefono'))
.style(style);
for (z = 0; z < b.length; z++) {
ws.cell(z + 2, 3)
.number(b[z].No_Telefono)
.style(style);
}
ws.cell(1, 4)
.string(('RFC'))
.style(style);
for (z = 0; z < b.length; z++) {
ws.cell(z + 2, 4)
.string(b[z].RFC)
.style(style);
}
ws.cell(1, 5)
.string(('Incidencia'))
.style(style);
for (z = 0; z < b.length; z++) {
ws.cell(z + 2, 5)
.string(b[z].Incidencia)
.style(style);
}
ws.cell(1, 6)
.string(('detalle'))
.style(style);
for (z = 0; z < b.length; z++) {
ws.cell(z + 2, 6)
.string(b[z].detalle)
.style(style);
}
ws.cell(1, 7)
.string(('fecha'))
.style(style);
for (z = 0; z < b.length; z++) {
ws.cell(z + 2, 7)
.date(b[z].fecha)
.style(style);
}
ws.cell(1, 8)
.string(('Status'))
.style(style);
for (z = 0; z < b.length; z++) {
ws.cell(z + 2, 8)
.string(b[z].Status)
.style(style);
}
ws.cell(1, 9)
.string(('hora'))
.style(style);
for (z = 0; z < b.length; z++) {
ws.cell(z + 2, 9)
.string(b[z].hora)
.style(style);
}
    if(!b.detalleN2){
      ws.cell(1, 10)
      .string(('horaS'))
      .style(style);
      for (z = 0; z < b.length; z++) {
      ws.cell(z + 2, 10)
      .string(b[z].horaS)
      .style(style);
      }
      ws.cell(1, 16)
      .string(('observacion'))
      .style(style);
      for (z = 0; z < b.length; z++) {
      ws.cell(z + 2, 16)
      .string(b[z].observacion)
      .style(style);
      }
            ws.cell(1, 11)
            .string(('detalleN2'))
            .style(style);
          for (z = 0; z < b.length; z++) {
            ws.cell(z + 2, 11)
            .string(b[z].detalleN2)
            .style(style);
          }
          ws.cell(1, 12)
          .string(('observacionN2'))
          .style(style);
        for (z = 0; z < b.length; z++) {
          ws.cell(z + 2, 12)
          .string(b[z].observacionN2)
          .style(style);
        }
        ws.cell(1, 13)
        .string(('Status_s'))
        .style(style);
      for (z = 0; z < b.length; z++) {
        ws.cell(z + 2, 13)
        .string(b[z].Status_s)
        .style(style);
      }
      ws.cell(1, 14)
      .string(('comentario_S'))
      .style(style);
      for (z = 0; z < b.length; z++) {
      ws.cell(z + 2, 14)
      .string(b[z].comentario_S)
      .style(style);
      }
      ws.cell(1, 15)
      .string(('correo'))
      .style(style);
      for (z = 0; z < b.length; z++) {
      ws.cell(z + 2, 15)
      .string(b[z].correo)
      .style(style);
      }
    }
await wb.write('Reporte_Ticktes.xlsx');
  });

app.get('/descarga' ,(req,res)=>{
  res.download(('Reporte_Ticktes.xlsx'))
})

app.get('/tick',verificar,async(req,res,next)=>{
    try {
        await alta.find().sort({_id:-1})
        .then(doc =>{
        res.json(doc)
    }) 
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
          })
    }
});
app.get('/ticket',async(req,res,next)=>{
  try {
      await alta.find({Status:"En proceso"})
      .then(doc =>{
      res.json(doc)
  }) 
  } catch (error) {
      return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        })
  }
});


app.post('/update',async(req,res,next)=>{
  var f = new Date();
  var hh = date.format(f,'HH:mm:ss');
   await alta.findByIdAndUpdate(req.body.ids,{Status_s:'Cerrado',comentario_S:req.body.comentario,horaS:hh})
  cloudinary.uploader.destroy(req.body.idurl);
  console.log('guardado')
  res.redirect('https://xpdsystem.herokuapp.com/')
});

app.post('/updateS',async(req,res,next)=>{
  console.log(req.body.ids)
  await alta.findByIdAndUpdate(req.body.ids,{Status:'Cerrado'})
  await alta.findById(req.body.ids)
  /*const transporter = nodemailer.createTransport({
    host: process.env.dominio,
    port: process.env.porttranspor,
    secure:false,
    auth: {
        user: process.env.usertranspor,
        pass: process.env.pass
    },
    tls:{
        rejectUnauthorized:true
    }
});
var infor = {
    from:"'Info expide tu factura',<info@xpd.mx>",
    to: 'soporte1@xpd.mx',
    subject :'TICKET DE SOPORTE CERRADO',
    text:`
    ESTIMADO CLIENTE : ANA
    SU TICKET DE SOPORTE 1
   CON ASUNTO :ACTIVACION DE RETENCIONES A SIDO CERRADO
   ESPERAMOS AYUDARLO LO MEJOR POSIBLE, SOLICITAMOS SU APOYO PARA CALIFICAR NUESTRO SERVICIO 
   DE CLICK EN LOS SIGUIENTE DOS LINK'S
   https://www.qvcsoftware.com/encuestasu-Mg2_MzUxNg2-Mg2_MQ2-Mg2-Mg2_Mg2
  https://www.qvcsoftware.com/encuestasu-Mg2_MzUxNw2-Mg2_MQ2-Mg2-Mg2_Mg2`};
transporter.sendMail(infor, function(error, info){
    if (error){
        console.log(error)
    }*/
  //});
  res.redirect('https://demoso.herokuapp.com/Vtickts')
})
app.post('/uploadimg', upload.single('image'), async (req, res, next,) => {
  console.log(req.body.ids)
  console.log(req.file);
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  await alta.findByIdAndUpdate(req.body.ids,{Url:result.secure_url,Url_id:result.public_id})
  console.log(result);
  await fs.unlink(req.file.path);
  res.redirect('https://demoso.herokuapp.com/Vtickts')
});

////da de alta los usuarios con cotraseña encriptada 
app.post('/registro',verificar, (req,res)=>{
  var f = new Date();
  var ff = date.format(f, 'YYYY-MM-DD')
  enigma.genHash(valorEncriptacion,key,req.body.pass,function(err,hash){
      if(err) return console.log(err);
     var pass=hash
  const Newuser = newuser({
      Usuario:req.body.usuario,
      Pass:pass,//req.body.pass,
      Correo:req.body.correo,
      Alta:ff,
  })
      Newuser.save().then(
          res.json({
              status:200,
              mensage:'dado de alta'
          }))
      })
      ///////////
      
      })
////////////////////////si existe el usuario y la contraseña devuelve un token con los datos encriptados

app.post('/soporte', verificar,async (req,res,next)=>{
  try{
    if(req.body.nombre === ""){
      res.status(404).json({
        mensaje: 'Falta Nombre'
      })
      return false
    }else if (req.body.numero == ""){
      res.status(404).json({
        mensaje: 'Falta Numero'
      })
      return false
    }else if (req.body.rfc == ""){
      res.status(404).json({
        mensaje: 'Falta RFC'
      })
      return false
  }
  //console.log(req.body)
  if(req.body.incidencian2 == ""){
    contador = contador + 1
    var usuario=req.usuario.usuario
    var f = new Date();
    var ff = date.format(f, 'YYYY-MM-DD')
    var hh = date.format(f,'HH:mm:ss');
    const altA = await new alta({  No_Ticket : contador, Se_Comunicó: req.body.nombre,No_Telefono: req.body.numero, RFC: req.body.rfc, Incidencia: req.body.incidencia,detalle:req.body.detalle,observacion:req.body.observacion, fecha :ff,hora:hh,Usuario : usuario,Status:"Cerrado"})
    try {
      altA.save().then(
        res.json({
          mensaje:'Guardado'
    }))} catch (error) {
    res.status(404).json({
    mensaje: 'Error'
    })
    }
  }else{
    if (req.body.correo == ""){
      res.status(404).json({
        mensaje: 'Falta Correo'
      })
      return false
  }
  else{
    contador = contador + 1
    var usuario=req.usuario.usuario
    var f = new Date();
    var ff = date.format(f, 'YYYY-MM-DD')
    var hh = date.format(f,'HH:mm:ss');
    const altA = await new alta({  No_Ticket : contador, Se_Comunicó: req.body.nombre,No_Telefono: req.body.numero, RFC: req.body.rfc, Incidencia: req.body.incidencia,detalle:req.body.detalle,observacion:req.body.observacion,detalleN2:req.body.incidencian2,observacionN2:req.body.detallen2,Status_s:'',comentario_S:'', fecha :ff,hora:hh,correo:req.body.correo,Usuario : usuario,Status:"En proceso"})
      const transporter = nodemailer.createTransport({
        host: process.env.dominio,
        port: process.env.porttranspor,
        secure:false,
        auth: {
            user: process.env.usertranspor,
            pass: process.env.pass
        },
        tls:{
            rejectUnauthorized:true
        }
    });
    var infor = {
        from:"'Info expide tu factura',<info@xpd.mx>",
        to: req.body.correo,
        subject :'TICKET DE SOPORTE ABIERTO',
        text:`
        Estimado Cliente:
        ${req.body.nombre}
        SU TICKET DE SOPORTE ${contador}
        CON INCIDENCIA : ${req.body.incidencian2} SE ENCUENTRA EN PROCESO DE SOLUCIÓN 
        ESPERAMOS PODER ATENDERLE A LA BREVEDAD POSIBLE `
    };
    transporter.sendMail(infor, function(error, info){
        if (error){
            console.log(error)
        }
    });try {
      altA.save().then(
        res.json({
          mensaje:'Guardado'
    }))} catch (error) {
    res.status(404).json({
    mensaje: 'Error'
    })
    }
  }
  }
}catch (error){
  res.status(404).json({
    mensaje: 'Error'
  })

}
});

app.post('/transferencia',verificar, async(req,res,next)=>{
  if(req.body.nombre === ""){
    res.status(404).json({
      mensaje: 'Falta Nombre'
    })
    return false
  }else if (req.body.numero == ""){
    res.status(404).json({
      mensaje: 'Falta Numero'
    })
    return false
  }else if (req.body.rfc == ""){
    res.status(404).json({
      mensaje: 'Falta RFC'
    })
    return false
  }else if (req.body.incidencia == ""){
    res.status(404).json({
      mensaje: 'Falta Agregar Incidencia'
    })
    return false
  }
  contador = contador + 1
  var usuario=req.usuario.usuario
  var f = new Date();
  var ff = date.format(f, 'YYYY-MM-DD')
  var hh = date.format(f,'HH:mm:ss');
  console.log('transferencia x3') 
  const altA = new alta({  No_Ticket : contador, Se_Comunicó: req.body.nombre,No_Telefono: req.body.numero, RFC: req.body.rfc, Incidencia:'Transferencia', detalle : req.body.incidencia, fecha :ff,hora:hh,Usuario : usuario,Status:"Cerrado"})
try {
  altA.save().then(
    res.json({
      mensaje:'Guardado'
}))} catch (error) {
res.status(404).json({
mensaje: 'Error'
})
}
})
app.post('/falla',verificar,async(req,res,next)=>{
  contador = contador + 1
  var usuario=req.usuario.usuario
  var f = new Date();
  var ff = date.format(f, 'YYYY-MM-DD')
  var hh = date.format(f,'HH:mm:ss',);
  console.log('falla') 
  const altA = new alta({  No_Ticket : contador, Se_Comunicó: "USUARIO",No_Telefono: 123456789, RFC: "XAXC010101000", Incidencia:'Falla Masiva', detalle : 'Falla Masiva', fecha :ff,hora:hh,Usuario : usuario,Status:"Cerrado"})
try {
  altA.save().then(
    res.json({
      mensaje:'Guardado'
}))} catch (error) {
res.status(404).json({
mensaje: 'Error'
})
}
})
app.post('/reseteo',verificar,async(req,res,next)=>{
  try{ 
    if(req.body.nombre === ""){
      res.status(404).json({
        mensaje: 'Falta Nombre'
      })
      return false
    }else if (req.body.numero == ""){
      res.status(404).json({
        mensaje: 'Falta Numero'
      })
      return false
    }else if (req.body.rfc == ""){
      res.status(404).json({
        mensaje: 'Falta RFC'
      })
      return false
    }
    else if (req.body.correo == ""){
      res.status(404).json({
        mensaje: 'Falta Correo'
      })
      return false
    }
    contador = contador + 1
    var f = new Date();
        var usuario=req.usuario.usuario
        var ff = date.format(f, 'YYYY-MM-DD')
        var hh = date.format(f,'HH:mm:ss');
      console.log('reseteo x4')
      const altA = new alta({  No_Ticket : contador, Se_Comunicó: req.body.nombre,No_Telefono: req.body.numero, RFC: req.body.rfc,Incidencia:'Reseteo', detalle : "Reseteo de contraseña", fecha :ff,hora:hh,correo:req.body.correo,Usuario : usuario,Status:"Cerrado"})
  var respuesta = await fetch(`https://xpdportal1.expidetufactura.com.mx:8443/CFDI33/usuario/password?rfc=${req.body.rfc}&usuario=admin&email=${req.body.correo}&password=pLf%23j_r74@jkhn5-`,{  
      method: 'post',
      })
      try {
  altA.save().then(
   res.json({
     mensaje:'Guardado'
   }))
} catch (error) {
  res.status(404).json({
    mensaje: 'Error'
  })
}   
    } catch (error) {
      res.status(404).json({
        mensaje: 'Error'
      })
    }
})
  app.post('/consulta', async(req,res)=>{
    console.log(req.body.Usuario)
    console.log(req.body.pass)
    var usuario = req.body.Usuario;
    var contra =  req.body.pass;
    try {
        await newuser.findOne({Usuario:usuario})
.then(doc =>{
    var hash=doc.Pass;
    enigma.Desencriptar(hash,function(err,des){
        if(err) return console.log(err);
        if(des===req.body.pass){
            const token = jwt.sign({
               id:doc.id,
               usuario:doc.Usuario,
               correo:doc.Correo,
            },'xpd',{ expiresIn: '8h' })
            res.json({
          token: token,
          mensaje: 'Conectado'
            })
        }else{
            return res.json({
              mensaje:'Contraseña invalida'
            })
            
        }
    })
})
    } catch (error) {
        return res.status(400).json({
          mensaje: 'Credenciales incorrectas',
    })
}
})

app.post('/descrip', (req,res)=>{
  var contra =  req.body.pass;
  enigma.Desencriptar(contra,function(err,des){
    if(err) return console.log(err);
    console.log(des);
  })
})

app.get('/reporte',(req,res,next)=>{
  alta.find().then(doc => 
  res.json(doc)) 
  })
 
app.listen(process.env.PORT,(req,res)=>{
    console.log('conectado')
});

//"Usuario":"Rey.Hernandez","pass":"rey1503atencionac"   agregar filtro de busqueda en tickets, la hora,

