import React,{useState} from 'react'
import "./Configuraciones.css";
import config from "../config"
import Calendario from '../Calendario/Calendario';
import TarjetaMensaje from '../TarjetaMensaje/TarjetaMensaje';

const Configuraciones = ({user,setUser}) => {
  const [info,setInfo] = useState({...user,...{fechasSelect: (user.horario ? user.horario :"").split(",")}});
  const [isVisible,setVisible] = useState(false);
  const [respuesta,SetRespuesta] = useState({error:false,visible:false,mensaje:""});
  
  const ActualizarFechas = (horario) =>{
    let fechaAct = new Date();
    horario = (typeof horario =="string" ? horario.split(","): horario )
    let horarioAct = horario.filter(el=>{
      return parseInt(el.split(":")[0].split("/")[2]+""+el.split(":")[0].split("/")[1]+""+el.split(":")[0].split("/")[0]) >= parseInt(fechaAct.getFullYear()+""+((fechaAct.getMonth()+1).toString().length==1 ? "0"+(fechaAct.getMonth()+1) : (fechaAct.getMonth()+1))+""+((fechaAct.getDate()).toString().length ==1 ? "0"+fechaAct.getDate() : fechaAct.getDate()))
    })
    let fechaUnida="";
    horarioAct.map(el=>fechaUnida +=el+",")
    fechaUnida = fechaUnida.slice(0,fechaUnida.length-1);
    return fechaUnida;
  }
  
  const handleChange =(e)=>{
    setInfo({...info,...{[e.target.name]:e.target.value}})
  }

  const handleFotoPerfil = (e)=>{
    if(e.target.files[0]){
      const formData= new FormData();
      formData.append("fotoPerfil",e.target.files[0]);
      fetch(`${config.host}/user/imgbase64`,{
        method:"POST",
        body:formData
      }).then(res=>res.json())
      .then(res=>{
        setInfo({...info,...{fotoPerfil:res}})
      })
    }
  }
  

  const handleActualizar = (e)=>{
    e.preventDefault();
    info.isCorreoNew = (info.correoElec.toUpperCase() == user.correoElec.toUpperCase() ? false : true)
    info.fechasSelect = (info.fechasSelect != "" ? ActualizarFechas(info.fechasSelect) :"")

    if(info.passwordNew && info.passwordNew !==""){
      if(info.passwordAct && info.passwordAct !="" 
      && info.passwordConf && info.passwordConf !=""
      && info.passwordNew == info.passwordConf){
        
        fetch(`${config.host}/user/updateInfo`,{
          method:"POST",
          body:JSON.stringify(info),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(res=>{
          if(res.ok){
            return res.json()
          }
          else{
            throw res.statusText;
          }
        })
        .then(res=>{
          if(res.name && res.name =="ERROR"){
            throw res.message
          }
          else{
            if(res[0].estado==false){
              delete info.passwordAct
              delete info.passwordNew
              delete info.passwordConf
              SetRespuesta({error:false,visible:true,mensaje:"Correo de verificacion Enviado"})
              setTimeout(()=>{
                localStorage.setItem("user",JSON.stringify({isLogin:false}))
                setUser({isLogin:false})
                info.fechasSelect = (info.fechasSelect ? info.fechasSelect :"").split(",")
              },10000)
            }
            else{
              delete info.passwordAct
              delete info.passwordNew
              delete info.passwordConf
              SetRespuesta({error:false,visible:true,mensaje:"Datos Actualizados con exito."})
              setTimeout(()=>{
                localStorage.setItem("user",JSON.stringify({...{isLogin:true},...res[0]}))
                setUser({...{isLogin:true},...res[0]});
                info.fechasSelect = (info.fechasSelect ? info.fechasSelect :"").split(",")
              },10000)
            }
          }

        })
        .catch(res=>{
          SetRespuesta({error:true,visible:true,mensaje:res})
        })
      }
      else if(!info.passwordAct || info.passwordAct ==""){
        SetRespuesta({error:true,visible:true,mensaje:"Debe ingresar su contraseña actual."})
      }
      else if(!info.passwordConf || info.passwordConf ==""){
        SetRespuesta({error:true,visible:true,mensaje:"Debe confirmar la nueva contraseña."})
      }
      else if(info.passwordNew != info.passwordConf){
        SetRespuesta({error:true,visible:true,mensaje:"Las contraseñas digitadas para la nueva contraseña no coinciden."})
      }
    }
    else{
      delete info.passwordAct
      delete info.passwordNew
      delete info.passwordConf
      
        fetch(`${config.host}/user/updateInfo`,{
          method:"POST",
          body:JSON.stringify(info),
          headers:{
            "Content-Type":"application/json",
          }
        })
        .then(res=>{
          if(res.ok){
            return res.json()
          }
          else{
            throw res.statusText;
          }
        })
        .then(res=>{
          if(res.name && res.name =="ERROR"){
            throw res.message
          }
          else{
            if(res[0].estado==false){
              SetRespuesta({error:false,visible:true,mensaje:"Correo de verificacion Enviado"})
              setTimeout(()=>{
                localStorage.setItem("user",JSON.stringify({isLogin:false}))
                setUser({isLogin:false})
                info.fechasSelect = (info.fechasSelect ? info.fechasSelect :"").split(",")
              },10000)
            }
            else{
              SetRespuesta({error:false,visible:true,mensaje:"Datos Actualizados con exito."})
              setTimeout(()=>{
                localStorage.setItem("user",JSON.stringify({...{isLogin:true},...res[0]}))
                setUser({...{isLogin:true},...res[0]});
                info.fechasSelect = (info.fechasSelect ? info.fechasSelect :"").split(",")
              },10000)
            }
          }

        })
        .catch(res=>{
          SetRespuesta({error:true,visible:true,mensaje:res})
        })
    }
  }
  return (
    <form onSubmit={handleActualizar} className='cont-configuraciones'>
    {respuesta.visible && <TarjetaMensaje SetRespuesta={SetRespuesta} respuesta={respuesta}/>}
      <div>
        <h2>Informacion personal</h2>
        <div>
          <label>
            Nombres:
            <input required name='nombres' onChange={handleChange} value={info.nombres} type="text"/>
          </label>
          <label>
            Apellidos:
            <input required name='apellidos' onChange={handleChange} value={info.apellidos} type="text"/>
          </label>
          <label>
            N. de Cedula:
            <input required name='cedula' value={info.cedula} onChange={handleChange} type="text"/>
          </label>
          <label>
            N. de Celular:
            <input required name='celular' onChange={handleChange} value={info.celular} type="text"/>
          </label>

        </div>
      </div>
      <hr/>
      <div>
        <h2>Foto de perfil</h2>
        <div className='cont-fotoPerfil'>
          <img src={"data:image;base64,"+(info.fotoPerfil ? info.fotoPerfil :"")} alt="fotoPerfil" />
          <button type='button' onClick={()=>{document.getElementById("select-foto").click()}}>Cambiar Foto</button>
          <input id='select-foto' name='fotoPerfil' onChange={handleFotoPerfil} className='hidden' type="file"/>
        </div>
      </div>
      <hr/>
      <div>
        <h2>Correo y contraseña</h2>
        <div className='contenedor-seg'>
          <label>
            Correo electronico:
            <input required name='correoElec' value={info.correoElec} onChange={handleChange} type="text"/>
          </label>

          <label>
            Contraseña actual:
            <input  name='passwordAct' value={info.passwordAct || ""} onChange={handleChange} type="password"/>
          </label>

          <label>
            Contraseña nueva:
            <input  name='passwordNew' value={info.passwordNew || ""} onChange={handleChange} type="password"/>
          </label>

          <label>
            Confirmar nueva contraseña:
            <input  name='passwordConf' value={info.passwordConf || ""} onChange={handleChange} type="password"/>
          </label>
        </div>
      </div>
      {user.nameTipoUser =="Tutor" && <>
      <hr/>
      <div>
        <h2>Horario de Disponibilidad</h2>
        <div className='cont-ver-H'>
        <button className='btn-ver-Horario' type='button' onClick={()=>{setVisible(!isVisible)}}>Ver Horario</button>
        </div>
      </div>
        <Calendario isVisible={isVisible} setVisible={setVisible} SetInfo={setInfo} info={info}/>
      </>}
      <button type='submit'>Actualizar Datos</button>
    </form>
  )
}

export default Configuraciones