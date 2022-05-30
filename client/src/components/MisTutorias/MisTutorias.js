import React,{useEffect,useState} from 'react'
import {Link} from "react-router-dom"
import "./MisTutorias.css";
import config from "../config";
import TarjetaMensaje from "../TarjetaMensaje/TarjetaMensaje"

const MisTutorias = ({user}) => {

    const [listTutorias,setListTutorias] = useState([]);
    const [respuesta,SetRespuesta] = useState({error:false,visible:false,mensaje:""});

    const handleCancelar = (id)=>{
      if(window.confirm("Seguro desea cancelar esta turoria")){
        fetch(`${config.host}/tutoria/cancelarTutoria`,{
            method:"POST",
            body:JSON.stringify({id:id}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>{
          let newListaTutorias = listTutorias.filter(el=>el.id != id);
          setListTutorias(newListaTutorias);
          SetRespuesta({error:false,visible:true,mensaje:"Tutoria cancelada con Exito."})
        })
      }
    }

    useEffect(()=>{
        fetch(`${config.host}/tutoria/consultarTutorias`,{
            method:"POST",
            body:JSON.stringify({id:user.id,op:(user.nameTipoUser =="Tutor" ? "T" : "E")}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then(res=>setListTutorias(res))
    },[])
  return (
    <div>
      {respuesta.visible && <TarjetaMensaje SetRespuesta={SetRespuesta} respuesta={respuesta}/>}
      <div className='cont-title-action'>
          <h2>Mis Tutorias</h2>
          <p>Recuerda ser muy puntual a la hora de la tutoria</p>
      </div>
      <hr/>
      <div className='contenedor-tutorias'>
        {listTutorias.map(el=><div className='cont-tarjeta-tutoria' key={el.id}>
          <img src={"data:image;base64,"+el.fotoPerfil}/>
          <div>
              <div>
                <h2>{user.nameTipoUser == "Tutor" ? "Estudiante" : "Tutor"}</h2>
                <h3>{el.nombreCompleto}</h3>
                <p>El encuentro se realizara via zoom por medio del enlace:</p>
                <Link to= {el.enlace}> {el.enlace}</Link>
                <div><span> <i className="fa-solid fa-calendar-days"></i> {el.fecha}</span> <span> <i className="fa-solid fa-clock"></i>{el.hora}</span></div>
              </div>
              <div className='cont-btn-action'>
                <button>Ver calendario</button>
                <button onClick={()=>handleCancelar(el.id)}>Cancelar Tutoria</button>
              </div>
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default MisTutorias