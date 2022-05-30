import React,{useState,useEffect} from 'react'
import "./ReservarTutoria.css";
import config from "../config";
import Calendario from '../Calendario/Calendario';

const ReservarTutoria = ({user}) => {
    const [listaMaterias,setListaMaterias] = useState([]);
    const [listaTutores,setListaTutores] = useState([]);
    const [info,setInfo] = useState({});
    const [isVisible,setVisible] = useState(false);

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
        .then(materias=>setListaMaterias([...materias]))
        .catch(res=> console.log(res))
    },[])

    const consultarTutores = (id)=>{
        fetch(`${config.host}/user/tutoresXmateria`,{
            method:"POST",
            body:JSON.stringify({id_materia:id}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(res=>setListaTutores(res))
    }

    const verHorario = (el)=>{
        setInfo({...el,...{fechasSelect:el.horario.split(",")}})
        setVisible(true);
    }

    return (
        <div>
            {isVisible && <Calendario isVisible={isVisible} setVisible={setVisible} info={info} user={user}/>}
            <div className='cont-title-action'>
                <h2>Reservar Tutoría</h2>
                <p>Recuerda ser muy puntual a la hora de la tutoria</p>
            </div>
            <hr/>
            <div className='contenedor-tarjetas-materias'>
                {listaMaterias.map(el=>{
                    return(
                        <div onClick={()=>consultarTutores(el.id)} key={el.id} className='tarjeta-materias'>{el.nombre}</div>
                    );
                })}
            </div>
            <hr/>
            <div className='contenedor-tarjetas-tutores'>
                {listaTutores.map(el=>{
                    return(
                        <div  key={el.id} className='tarjetas-tutores'>
                            <div><img src={`data:image;base64,${el.fotoPerfil}`}/></div>
                            <div className='cont-info-tutor'>
                                <h2>Tutor</h2>
                                <h3>{el.nombreCompleto}</h3>
                                <p>{el.descripcion}</p>
                                <button onClick={()=>verHorario(el)}>Ver Horarios</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ReservarTutoria