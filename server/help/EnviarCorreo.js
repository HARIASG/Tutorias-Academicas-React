//Requerimos el paquete
const {encriptar,binary_encode} = require("./encriptar");
var nodemailer = require('nodemailer');

const EnviarCorreo = (correo,id)=>{
    
//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tutoriasacademicas02@gmail.com',
      pass: 'cdeymrlldiwauztb'
    },
    host:"localhost",
    secure:false
  });

    var mensaje = "Se ha Realizado el registro de un usuario en la plataforma de Tutorias Academicas con este correo, si ha sido usted confirme para activar su cuenta. "+
    "http://localhost:3000/?"+binary_encode(id);
    
    var mailOptions = {
      from: 'tutoriasacademicas02@gmail.com',
      to: correo,
      subject: 'Confirmacion de Corro Electronico',
      text: mensaje
    };
    
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
}

module.exports= EnviarCorreo