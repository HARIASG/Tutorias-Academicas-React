import React,{useState,useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BarraNav from '../BarraNav/BarraNav';
import LabelDinamico from '../LabelDinamico/LabelDinamico';
import TarjetaMensaje from '../TarjetaMensaje/TarjetaMensaje';
import TarjetasHacemos from '../TarjetasHacemos/TarjetasHacemos';
import config from "../config";
import "./Inicio.css";

const Inicio = ({user}) => {
  const [respuesta,SetRespuesta] = useState({error:false,visible:false,mensaje:""});
  const navegar = useNavigate();

  useEffect(()=>{
      if(user.isLogin){
          navegar("/logininicio")
      }
  },[user])

  useEffect(()=>{
    if(window.location.href.split("?").length>1){
      fetch(`${config.host}/user/update`,{
        method:"POST",
        body:JSON.stringify({id:window.location.href.split("?")[1]}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(res=>{
          if(res.ok){
            SetRespuesta({error:false,visible:true,mensaje:"Cuenta Activada Con Exito"})
            setTimeout(()=>{
              window.location.href=window.location.href.split("?")[0]
            },5000)
          }
        
      })
      .catch()
    }
  },[])

  return (
    <div>
        <BarraNav/>
        {respuesta.visible && <TarjetaMensaje SetRespuesta={SetRespuesta} respuesta={respuesta}/>}
        <div className='cont-title'>
          <div className="cont-inter"></div>
          <div className='children-1'>
            <div className='cont-info'>
              <h1>Tutorías Academicas</h1>
              <LabelDinamico/>
            </div>
            <div className='cont-regitrar'>
              <NavLink to="/registrarEstudiante">Registro de estudiantes</NavLink>
              <NavLink to="/registrarTutor">Registro de tutores</NavLink>
            </div>
          </div>
          <div className='footer'>
            <p><span><strong>Fortalece</strong></span> tus conocimientos con nuestros tutores</p>
          </div>
        </div>

        <div className='cont-hacemos'>
          <div className='children-1'>
            <div className="cont-inter"></div>
            <div>
              <h1>lo que hacemos</h1>
              <div className='linear'></div>
            </div>

            <div className='contenedor-tarjetas'>
              <TarjetasHacemos titulo="CALENDARIO DE TUTORIAS" texto="Conoce todas las fechas de las tutorias programadas hasta el momento para que te guies mejor en la escoguencia de un horario."/>
              <TarjetasHacemos titulo="IMAGENES" texto="Aquí puedes mirar muchas de las experiencias que han tenido nuestros tutores en sus clases privadas con los alumnos."/>
              <TarjetasHacemos titulo="FORMAS DE PAGO" texto="Cada día son más las personas que ya no sólo pagan en efectivo, sino que también utilizan otras formas de pago para realizar sus compras."/>
              <TarjetasHacemos titulo="LISTA DE TUTORES" texto="Conoce nuestro equipo de tutores."/>
            </div>
          </div>
          <div className='children-2'>
            <div className="cont-inter2"></div>
            <div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ullam, rem Perspiciatis cum doloremque assumenda nostrum porro sed? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, ipsam eaque! Quibusdam aliquid explicabo quisquam assumenda saepe iste ducimus recusandae debitis numquam, ipsam facilis earum soluta inventore illo a praesentium!
              </div>
              <button>Comenzar tutoria ahora</button>
            </div>
          </div>
        </div>

        <div className='cont-testimonios'>

        </div>
        <div className='cont-contactenos'>

        </div>
    </div>
  )
}

export default Inicio;