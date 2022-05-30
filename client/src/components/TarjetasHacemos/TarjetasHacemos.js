import React from 'react'
import "./TarjetasHacemos.css"
const TarjetasHacemos = ({icono,titulo,texto}) => {
  return (
    <div className='contenedor'>
        <img src={icono} alt=""/>
        <h2>{titulo}</h2>
        <p>{texto}</p>
    </div>
  )
}

export default TarjetasHacemos