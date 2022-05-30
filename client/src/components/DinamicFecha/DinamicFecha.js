import React,{useState,useEffect} from 'react'
import config from "../config";
import TarjetaMensaje from '../TarjetaMensaje/TarjetaMensaje';
import "./DinamicFecha.css"


let dayWeek = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingos"]

const DinamicFecha = ({fecha,action,setVisible,info,SetInfo,user}) => {
    const [reserva,setReserva] = useState("");
    const [respuesta,SetRespuesta] = useState({error:false,visible:false,mensaje:""});
    const [tutoriasReservadas,setTutoriasReservadas] = useState([]);
    let fechas = new Date(fecha);
    let fechaIni;
    let arrayDay=[];
    let horas = new Array(24);

    useEffect(()=>{
        if(info.id){
            fetch(`${config.host}/tutoria/tutoriasReservadas`,{
                method:"POST",
                body: JSON.stringify({id_tutor:info.id}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(res=>{
                let arreglo = res.map(el=>el.fecha);
                setTutoriasReservadas(arreglo)
            })
        }
    },[respuesta])

    const handleOcultarHorario = ()=>{
        setVisible(false);
    }

    const ocultarReserva = (e)=>{
        e.stopPropagation();
        setReserva("")
    }

    const handleIsSelect = (fecha)=>{
        let valor = (info.fechasSelect ? info.fechasSelect.indexOf(fecha) : -1);
        return valor;
    }

    const reservarTutoria =(id_estudiante,id_tutor,fecha)=>{
        if( window.confirm("Desea Reservar la tutoria")){
            let datos ={id_estudiante,id_tutor,fecha};
            fetch(`${config.host}/tutoria/reservarTutoria`,{
                method:"POST",
                body: JSON.stringify(datos),
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
                if(res.name=="ERROR"){
                    throw res.message
                }else{
                    SetRespuesta({error:false,visible:true,mensaje:"Tutoria Reservada con Exito"})
                    setReserva("")
                }
            })
            .catch(err=>{
                SetRespuesta({error:true,visible:true,mensaje:err})
            })
        }
    }

    const handleSelect = (fecha)=>{
        if(info.nameTipoUser ==="Tutor"){
            if(tutoriasReservadas.indexOf(fecha) == -1){
                let vector = (info.fechasSelect ? info.fechasSelect : [])
                let valor = handleIsSelect(fecha);
                if( valor == -1){
                    vector.push(fecha);
                }
                else{
                    vector.splice(valor,1);
                }
        
                SetInfo({...info,...{"fechasSelect":vector}});
            }
        }
        else{
            if(handleIsSelect(fecha) != -1 && tutoriasReservadas.indexOf(fecha) == -1){
                setReserva(fecha);
            }
        }
    }

    for(let i = 0;i<24;i++){
        horas[i]={
            id:i,
            hora:`${i}:00`
        }
    }

    if(action=="next"){
        fechaIni = new Date(fechas.setDate(fechas.getDate() - 6))
    }
    else{
        fechaIni = new Date(fecha);
    }

    for(let i=0;i<7;i++){
        arrayDay[i] = {
            id: arrayDay.length+1,
            nombreDia: dayWeek[fechaIni.getDay()],
            fecha: `${(fechaIni.getDate().toString().length==1 ? '0'+fechaIni.getDate().toString() : fechaIni.getDate().toString())}/${((fechaIni.getMonth()+1).toString().length==1 ? '0'+(fechaIni.getMonth()+1).toString() : (fechaIni.getMonth()+1).toString())}/${fechaIni.getFullYear()}`
        }
        fechaIni.setDate(fechaIni.getDate()+1);
    }
  return (
    <>
    {respuesta.visible && <TarjetaMensaje SetRespuesta={SetRespuesta} respuesta={respuesta}/>}
    <table>
        <thead>
            <tr>
                <th>
                    <div>Horas</div>
                </th>
                {arrayDay.map(el=><th className='cont-thead-fecha' key={el.id}><div>{el.nombreDia},</div>{el.fecha}</th>)}
            </tr>
        </thead>

        <tbody>
            {horas.map(e=><tr key={e.id}>
                <td>{e.hora}</td>
                {arrayDay.map(el=>
                <td onClick={()=>handleSelect((el.fecha+":"+e.hora))} className={"seleccionableF "+(handleIsSelect(el.fecha+":"+e.hora) != -1 ? (tutoriasReservadas.indexOf(el.fecha+":"+e.hora) != -1 ? "reservada" : "selectFecha") :"")} id={el.fecha+":"+e.hora} key={el.id}>
                {(handleIsSelect(el.fecha+":"+e.hora) != -1 ? e.hora+" - "+(parseInt(e.hora.split(":")[0])+1)+":00" : "")}
                    <div className={'cont-reservarT '+(reserva ==`${el.fecha}:${e.hora}` ? "visible-reserva":"")}>
                        <span onClick={ocultarReserva}>X</span>
                        <h4>Tutor: {info.nombreCompleto}</h4>
                        <p>Fecha: {el.fecha}</p>
                        <p>Hora: {e.hora}</p>
                        <button onClick={()=>reservarTutoria(user.id,info.id,`${el.fecha}:${e.hora}`)}>reservar tutoria</button>
                    </div>
                </td>)}
            </tr>)}
        </tbody>
        <tfoot><tr><td colSpan="8"><button type='button' onClick={handleOcultarHorario}>Aceptar</button></td></tr></tfoot>
    </table>
    </>
  )
}

export default DinamicFecha