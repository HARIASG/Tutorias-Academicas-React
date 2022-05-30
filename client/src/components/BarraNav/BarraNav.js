import {useState} from "react"
import "./BarraNav.css";
import logo from "../../img/logo.png"
import { NavLink } from "react-router-dom";

const BarraNav = ({user,setUser}) => {
  const [visible,setVisible] = useState(false);

  const handleCerrarSesion = ()=>{
    localStorage.clear();  
    setUser({})
  }

  return (
    <nav className='Contenedor-BarraNav'>
        {(!user || !user.isLogin) && <img className='Logo-Nav' src={logo} alt="logo"/>}
        <div className="contenedor-action">
            {(!user || !user.isLogin) && <NavLink to="/inicio">Inicio</NavLink>}
            {/* {(!user || !user.isLogin) && <NavLink to="/servicios">Servicios</NavLink>}
            {(!user || !user.isLogin) && <NavLink to="/testimonios">Testimonios</NavLink>}
            {(!user || !user.isLogin) && <NavLink to="/contactanos">Contactanos</NavLink>} */}
            {(!user || !user.isLogin) && <div className="btn-iniciar-sesion "> <NavLink to="/login">Iniciar Sesion</NavLink></div>}
            {user && user.isLogin && 
            <div onMouseLeave={()=>setVisible(false)} onMouseEnter={()=>setVisible(true)} className="content-user-sesion">
              <img src={"data:image;base64,"+(user.fotoPerfil ? user.fotoPerfil :"")} alt="fotoPerfil"/>
              <h2>{user.nombres}</h2>
              <i className="fa fa-circle-chevron-down"></i>
              {
                visible &&
                <ul className="menu-sesion">
                  <li onClick={handleCerrarSesion}>Cerrar Sesion</li>
                  <li>Cambiar contrañena</li>
                </ul>
              }
            </div>}
        </div>
    </nav>
  )
}

export default BarraNav