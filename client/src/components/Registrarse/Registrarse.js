import React,{useState,useRef,useEffect} from 'react'
import BarraNav from '../BarraNav/BarraNav';
import Calendario from '../Calendario/Calendario';
import TarjetaMensaje from '../TarjetaMensaje/TarjetaMensaje';
import config from "../config";
import "./Registrarse.css";
import { useNavigate } from 'react-router-dom';

const Registrarse = ({tipoRegistro,user}) => {
    const hiddenFile = useRef();
    const nombreFoto = useRef();
    const [passwordErr,setPasswordErr] = useState(false);
    const [listMaterias,setListMaterias] = useState([]);
    const [info,SetInfo] = useState({nameTipoUser:tipoRegistro});
    const [respuesta,SetRespuesta] = useState({error:false,visible:false,mensaje:""});
    const [isVisible,setVisible] = useState(false);
    const navegar = useNavigate();
    
    
    useEffect(()=>{
        if(user.isLogin){
            navegar("/logininicio")
        }
    },[user])

    const selectFoto = ()=>hiddenFile.current.click();

    const handleInfo = (e)=>{
        if(e.target.name == "fotoPerfil"){
            SetInfo({...info,...{[e.target.name]: e.target.files[0]}})
            nombreFoto.current.textContent = (e.target.files[0] ? e.target.files[0].name: 'Seleccionar foto de perfil');
        }
        else{
            SetInfo({...info,...{[e.target.name]: e.target.value}})
        }
    }

    const registrarUser = (e)=>{
        e.preventDefault();
        let valido = true;
        let expReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(tipoRegistro=="Tutor"){
            info.tipoUser ='T'
            if(!info.materia || info.materia =='0' || info.materia ==''){
                valido =false;
                alert("No ha seleccionado la Materia")
            }

            if((info.fechasSelect ? info.fechasSelect.length : 0) == 0 ){
                alert("Debe seleccionar un horario");
                valido=false;
            }
        }
        else{
            info.descripcion ='';
            info.tipoUser ='E'
        }


        if(!info.fotoPerfil || hiddenFile.current.value==""){
            valido=false;
            alert("No ha seleccionado foto de perfil")
        }
        else{
            let formatoIng =hiddenFile.current.value.split(".")[1].toUpperCase();
            if(formatoIng != 'JPG' && formatoIng != 'PNG' && formatoIng != 'GIF'){
                alert("Formatos permitidos para Foto de perfil: (jpg,png,gif)");
                valido=false;
            }
        }

        if(info.password !== info.passwordC){
            alert("Las contraseñas no coinciden porfavor verificar");
            valido=false;
            setPasswordErr(true);
        }
        else{
            setPasswordErr(false);
        }

        if(!expReg.test(info.correo)){
            valido=false;
            alert("El correo ingresado no es valido")
        }

        if(valido){
            let formData = new FormData();
            formData.append("nombres",info.nombres)
            formData.append("apellidos",info.apellidos)
            formData.append("cedula",info.cedula)
            formData.append("celular",info.celular)
            formData.append("fotoPerfil",info.fotoPerfil)
            formData.append("correo",info.correo)
            formData.append("password",info.password)
            formData.append("tipoUser",info.tipoUser)
            formData.append("descripcion",info.descripcion)
            formData.append("materia",(info.materia? info.materia : 0))
            formData.append("fechasSelect",(info.fechasSelect ? info.fechasSelect : ''))
            fetch(`${config.host}/user/save`,{
                "method":"POST",
                body: formData,
                // headers:{
                //     'Content-Type': 'application/json'
                // }
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
                }else{
                    SetRespuesta({error:false,visible:true,mensaje:"Correo de verificacion Enviado"})
                    SetInfo({})
                    nombreFoto.current.textContent = 'Seleccionar foto de perfil';

                    // document.getElementById("pruebaimg").setAttribute("src",`data:image;base64,${res[0].imagen}`)
                }
            })
            .catch(err=>{
                SetRespuesta({error:true,visible:true,mensaje:err})
            })
        }
    }

    const handleActivarHorario = ()=>{
        setVisible(true);
    }

    useEffect(()=>{
        fetch(`${config.host}/materias`)
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                throw res.statusText;
            }
        })
        .then(materias=>setListMaterias([...materias]))
        .catch(res=> console.log(res))
    },[])

  return (
    <div className='contenedor-Registrar'>
        <Calendario isVisible={isVisible} setVisible={setVisible} SetInfo={SetInfo} info={info}/>
        <BarraNav/>
        {respuesta.visible && <TarjetaMensaje SetRespuesta={SetRespuesta} respuesta={respuesta}/>}
        <div className='cont-form'>
            <div className={`cont-img ${tipoRegistro}`}>
                <h1><strong>Tutorías</strong> virtuales</h1>
                <p>de una manera practica y sencilla</p>
            </div>
            <div className='form'>
                <form onSubmit={(e)=>registrarUser(e)}>
                    <div className='title'>
                        <p> <span>Registro</span> de <span>{(tipoRegistro=="Tutor" ? "Tutores" : "Estudiantes")}</span></p>
                        <p>Crea una cuenta para ingresar</p>
                    </div>
                    <div>
                        <div>
                            <input name='nombres' required value={info.nombres ? info.nombres : ''} onChange={(e)=>handleInfo(e)} type="text" placeholder='Nombres'/>
                            <input name='apellidos' required value={info.apellidos ? info.apellidos : ''} onChange={(e)=>handleInfo(e)} type="text" placeholder='Apellidos'/>
                        </div>
                        <div>
                            <input name='cedula' required value={info.cedula ? info.cedula : ''} onChange={(e)=>handleInfo(e)} type="text" placeholder='N. de cedula'/>
                            <input name='celular' required value={info.celular ? info.celular : ''} onChange={(e)=>handleInfo(e)} type="text" placeholder='N. de celular'/>
                        </div>
                    </div>
                    <div>
                        {
                            (tipoRegistro=="Tutor" &&
                            <div className='cont-materia'>
                                <label><strong>Materias</strong></label>
                                <select name="materia" required value={info.materia ? info.materia : ''} onChange={(e)=>handleInfo(e)} id="materia">
                                    <option value="0">Seleccione</option>
                                    {
                                        listMaterias.map(materia=><option key={materia.id} value={materia.id}>{materia.nombre}</option>)
                                    }
                                </select>
                            </div>)
                        }
                        <div onClick={selectFoto} className='cont-select-foto'>
                            <i className="fa fa-cloud-arrow-up"></i>
                            <strong ref={nombreFoto}>Seleccionar foto de perfil</strong>
                            <input ref={hiddenFile} onChange={(e)=>handleInfo(e)} name='fotoPerfil' className='hidden' type="file"/>
                        </div>
                        <div>
                            <input name='correo' required value={info.correo ? info.correo : ''} onChange={(e)=>handleInfo(e)} className='correo' type="text" placeholder='Correo Electronico'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input className={passwordErr ? "passError":""} name='password' required value={info.password ? info.password : ''} onChange={(e)=>handleInfo(e)} type="password" placeholder='Contraseña'/>
                            <input className={passwordErr ? "passError" :""} name="passwordC" required value={info.passwordC ? info.passwordC : ''} onChange={(e)=>handleInfo(e)} type="password" placeholder='Confirmar Contraseña'/>
                        </div>
                    </div>
                    {
                        (tipoRegistro=="Tutor" &&
                        <div>
                            <div>
                                <textarea name='descripcion' required value={info.descripcion ? info.descripcion : ''} onChange={(e)=>handleInfo(e)} cols="50" rows="5" placeholder='Descripcion y especialidad del Tutor. MAximo 150 caracteres'></textarea>
                            </div>
                            <div onClick={handleActivarHorario} className='select-horario'> <strong>Seleccionar horario</strong></div>
                            </div>
                        )
                    }
                    <div>
                        <div>
                            <p>Al registrarse aceptas nuestras <strong>Condiciones</strong> y <strong>politicas de datos</strong></p>
                        </div>
                        <div><button type='submit' className='btn-registrar'>Registrarse</button></div>
                    </div>
                </form>
            </div>
        </div>
    
    </div>
  )
}

export default Registrarse