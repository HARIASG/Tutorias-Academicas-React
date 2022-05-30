import React,{useEffect} from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import BarraNav from "../BarraNav/BarraNav"
import Configuraciones from '../Configuraciones/Configuraciones'
import EstudiantesAsignados from '../EstudiantesAsignados/EstudiantesAsignados'
import MisTutorias from '../MisTutorias/MisTutorias'
import ReservarTutoria from '../ReservaTutoria/ReservarTutoria'
import "./InicioLogin.css"

const InicioLogin = ({user,setUser}) => {
  const navegar = useNavigate();
  
  useEffect(()=>{
    if(!user.isLogin){
      navegar("/login");
    }
  },[user])

  return (
    <div className='contenedor-inicio-login'>
      <BarraNav user={user} setUser={setUser}/>
      <div className='contenedor-menu'>
        <div className='conten-info-perfil'>
          <div className='contenet-img-perfil'>
            <img src={"data:image;base64,"+ (user.fotoPerfil ? user.fotoPerfil :"")} alt=""/>
            <i className="fa fa-camera"></i>
          </div>
          <h2>{user.nombreCompleto}</h2>
          <p>{user.nameTipoUser}</p>
          <button>Editar perfil</button>
          <i className="fa fa-camera"></i>
        </div>
        <div className='cont-actions'>
        {user.nameTipoUser==="Tutor" && 
          <>
          <NavLink to="/logininicio/estudiantesAsignados">Estudiantes asignados</NavLink>
          </>}

          {user.nameTipoUser==="Estudiante" && 
          <>
            <NavLink to="/logininicio/reservarTutoria">Reservar tutorias</NavLink>
          </>}
          
          <NavLink to="/logininicio/misTutorias">Mis tutorias</NavLink>
          <NavLink to="/logininicio/configuraciones">Configuraciones</NavLink>
          
        </div>
      </div>
      <div className='contenedor-body'>
        <Routes>
          {user.nameTipoUser==="Tutor" && 
          <>
            <Route exact path='/estudiantesAsignados' element={<EstudiantesAsignados user={user}/>}/>
          </>}

          {user.nameTipoUser==="Estudiante" && 
          <>
            <Route exact path='/reservarTutoria' element={<ReservarTutoria user={user}/>}/>
          </>}
            <Route exact path='/misTutorias' element={<MisTutorias user={user}/>}/>
            <Route exact path='/configuraciones' element={<Configuraciones user={user} setUser={setUser}/>}/>
          
        </Routes>
      </div>
    </div>
  )
}

export default InicioLogin