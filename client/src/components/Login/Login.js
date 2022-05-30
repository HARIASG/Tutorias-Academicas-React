import {useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BarraNav from "../BarraNav/BarraNav";
import config from "../config";
import TarjetaMensaje from "../TarjetaMensaje/TarjetaMensaje";
import "./Login.css";

const Login =({user,setUser})=>{
    const [info,setInfo] = useState({});
    const [viviblePass,setVisiblePass] = useState(false);
    const [respuesta,SetRespuesta] = useState({error:false,visible:false,mensaje:""});
    const navegar = useNavigate();

    useEffect(()=>{
        if(user.isLogin){
            navegar("/logininicio")
        }
    },[user])
   
    const enviarCredenciales=(e)=>{
        e.preventDefault();
        document.getElementById("btn-iniciarSesion").textContent = "iniciando Sesion..."
        fetch(`${config.host}/user/login`,{
            method:"POST",
            body:JSON.stringify(info),
            headers:{
                "Content-Type": "application/json"
            }
            
        })
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                console.log(res.statusText)
                throw res.statusText;
            }
        })
        .then(res=>{
            if(res.name=="ERROR"){
                throw res.message
            }
            else{
                document.getElementById("btn-iniciarSesion").textContent = "Iniciar Sesion"
                localStorage.setItem("user",JSON.stringify({...{isLogin:true},...res[0]}))
                setUser({...{isLogin:true},...res[0]});
            }
        })
        .catch(err=>{
            document.getElementById("btn-iniciarSesion").textContent = "Iniciar Sesion"
            SetRespuesta({error:true,visible:true,mensaje:err})
        })
    }

    const handleChange = (e)=>{
        setInfo({...info,...{[e.target.name]:e.target.value}});
    }
    
    return(
        <div className="Contenedor-Login">
            <BarraNav/>
            {respuesta.visible && <TarjetaMensaje SetRespuesta={SetRespuesta} respuesta={respuesta}/>}
            <div className="cont-form-login">
                <div>
                    <p><strong>Tutorías</strong> virtuales</p>
                    <p>de una manera practica y sencilla</p>
                </div>
                <form onSubmit={enviarCredenciales}>
                    <div>
                        <i className="fa fa-circle-user"></i>
                        <input required onChange={handleChange} name="username" value={info.username ? info.username :""} type="text" placeholder="Username"/>
                    </div>
                    <div>
                        <i className="fa fa-lock"></i>
                        <input required onChange={handleChange} name="password" value={info.password ? info.password :""} type={viviblePass ? "text" : "password"} placeholder="Password"/>
                        <i onClick={()=>setVisiblePass(!viviblePass)} id="verPass" className="fa fa-eye"></i>
                    </div>
                    <div>
                        <button id="btn-iniciarSesion" type="submit">Iniciar Sesion</button>
                    </div>
                    <div><NavLink to="/recuperarPassword">Olvide mi contraseña</NavLink></div>
                </form>
            </div>
        </div>
    );
}

export default Login;