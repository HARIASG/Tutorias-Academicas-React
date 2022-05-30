import React from 'react'
import "./TarjetaMensaje.css"
const TarjetaMensaje = ({respuesta,SetRespuesta}) => {
    setTimeout(()=>{
        SetRespuesta({error:false,visible:false,mensaje:""});
    },10000)

    return (
        <div className={respuesta.error ? "error":"success"}>{respuesta.mensaje}</div>
    )
}

export default TarjetaMensaje
