// const dbcategoria = require("./dbcategoria");
const {encriptar,binary_decode,desencriptar} = require("./help/encriptar");
const dbMaterias = require("./Model/Materias");
const enviarCorreo = require("./help/EnviarCorreo");
const dbUser = require("./Model/User");
const dbTutoria = require("./Model/Tutorias")
let expres = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let app = expres();
let router = expres.Router();

//MIDELWARE NECESARIO PARA LAS IMAGENES
let fs = require("fs");
const path = require("path");
const multer = require("multer");
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname,'./fotoPerfil'),
    filename:(req,file,cb)=>{
        cb(null,Date.now() +"-"+ file.originalname )
    }
})


const fileUpload = multer({
    storage:diskstorage
}).single("fotoPerfil")

//Rutas
app.use(bodyParser.urlencoded({extended:true,limit:"1000mb"}));
app.use(bodyParser.json({limit:"1000mb"}));
app.use(cors());
app.use("/",router); //ruta Principal

router.route("/materias").get((reque,respon)=>{
    dbMaterias.consultarMaterias().then(result=>{
        respon.json(result);
    })
})

router.route("/user/update").post((reque,respon)=>{
    let id_decodificado = binary_decode(reque.body.id)
    if(!isNaN(id_decodificado)){
        dbUser.userState(id_decodificado).then(result=>{
            respon.json({ok:true});
        })
    }
    else{
        respon.json({ok:false});
        // respon.sendStatus(400);
    }
})

router.post("/user/save",fileUpload,(reque,respon)=>{
    let imgBase64 = Buffer.from(fs.readFileSync(reque.file.path)).toString("base64");
    let user = {...reque.body,...{"fotoPerfil":imgBase64}};
    let respuesta = encriptar(user.password);

    respuesta.then(passwordE=>{
        user = {...user,...{password:passwordE}}
        dbUser.userSave(user).then(result=>{
            
            if(result.originalError){
                result =  result.originalError.info;
            }
            else{
                enviarCorreo(user.correo,result[0].id)
            }
            fs.unlinkSync(reque.file.path)
            respon.json(result);

            
        })
    })

})

router.post("/user/imgbase64",fileUpload,(reque,respon)=>{
    let imgBase64 = Buffer.from(fs.readFileSync(reque.file.path)).toString("base64");
    fs.unlinkSync(reque.file.path)
    respon.json(imgBase64);
})

router.route("/user/tutoresXmateria").post((reque,respon)=>{
    let id_materia = reque.body.id_materia;
    dbUser.tutoresXmateria(id_materia)
    .then(res=>{
        respon.json(res);
    })
})

router.route("/tutoria/reservarTutoria").post((reque,respon)=>{
    dbTutoria.reservarTutoria(reque.body)
    .then(res=>{
        if(res.originalError){
            res =  res.originalError.info;
        }
        respon.json(res);
    })
})

router.route("/tutoria/consultarTutorias").post((reque,respon)=>{
    dbTutoria.consultarTutorias(reque.body)
    .then(res=>{
        respon.json(res);
    })
})

router.route("/tutoria/tutoriasReservadas").post((reque,respon)=>{
    let id_tutor = reque.body.id_tutor;
    dbTutoria.tutoriasReservadas(id_tutor)
    .then(res=>{
        respon.json(res);
    })
})

router.route("/user/estudiantesAsig").post((reque,respon)=>{
    let id_tutor = reque.body.id_tutor;
    dbUser.estudiantesAsig(id_tutor)
    .then(res=>{
        respon.json(res);
    })
})


router.route("/user/login").post((reque,respon)=>{
    let {username,password} = reque.body;
    dbUser.passwordGet(username).then(result=>{
        if(result.originalError){
            result =  result.originalError.info;
            respon.json(result);
        }
        else{
            let respuesta = desencriptar(password,result[0].password)
            respuesta.then(res=>{
                if(res){
                    respon.json(result);
                }
                else{
                    let result = {name:"ERROR",message:"Contraseña invalida"}
                    respon.json(result);
                }
            })
        }
        
        
    })
})


router.route("/user/updateInfo").post((reque,respon)=>{
    let user =  {...reque.body}
    user.tipoUser = (user.nameTipoUser =="Tutor" ? "T" : "E")
    user.correo = user.correoElec
    user.fotoPerfil =  Buffer.from(user.fotoPerfil)
    let isPassIgual = (user.passwordNew ? desencriptar(user.passwordAct,user.password) : true)
    if(typeof isPassIgual =="boolean"){
        
        //se realiza consulta sin modificar contraseña
        dbUser.userSave(user).then(result=>{
                        
            if(result.originalError){
                result =  result.originalError.info;
            }
            else if(user.isCorreoNew == true){
                
                enviarCorreo(user.correo,user.id)
            }
            respon.json(result);
        })
    }
    else{
        isPassIgual.then(res=>{
            //devuelve un boolean
            
            if(res==true){
                
                let respuesta = encriptar(user.passwordNew);
                respuesta.then(passwordE=>{
                    user = {...user,...{password:passwordE}}
                    dbUser.userSave(user).then(result=>{
                        
                        if(result.originalError){
                            result =  result.originalError.info;
                        }
                        else if(user.isCorreoNew == true){
                            enviarCorreo(user.correo,user.id)
                        }
                        respon.json(result);
                    })
                })
            }
            else{
                let result = {name:"ERROR",message:"La contraseña Actual es invalida"}
                respon.json(result);
            }
        })
    }

})



let port = process.env.PORT || 3001;
app.listen(port,()=>{ console.log("Corriendo API en el puerto: "+port)});