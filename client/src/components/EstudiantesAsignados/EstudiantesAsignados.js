import React,{useEffect,useState} from 'react'
import "./EstudiantesAsignados.css";
import config from "../config";

const EstudiantesAsignados = ({user}) => {
    const [listEstudiante,setListStudiantes] = useState([]);

    useEffect(()=>{
        fetch(`${config.host}/user/estudiantesAsig`,{
            method:"POST",
            body: JSON.stringify({id_tutor: user.id}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then(res=>setListStudiantes(res))
    },[])

  return (
    <div>
      <div className='cont-title-action'>
          <h2>Estudiantes Asignados</h2>
          <p>Estos son los alumnos con los que tiene tutorias asignadas.</p>
      </div>
      <hr/>
      {listEstudiante.map(el=><div className='cont-tarjeta-estudiante' key={el.id_estudiante}>
        <div>
           <img src={"data:image;base64,"+el.fotoPerfil}/>
           <div>
             <h1>Estudiante</h1>
             <h2>{el.nombreCompleto}</h2>
           </div>
        </div>
      </div>)}
    </div>
  )
}

export default EstudiantesAsignados