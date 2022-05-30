import React,{useState,useEffect} from 'react'
import "./Calendario.css"
import DinamicFecha from '../DinamicFecha/DinamicFecha';

let Meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const Calendario = ({isVisible,setVisible,info,SetInfo,user}) => {
    const [action,setAction] = useState("next")
    const [fecha,SetFecha] = useState(new Date());
    const [diaIni,setDiaIni]=useState(fecha.getDate());
    const [mesIni,setMesIni]=useState(Meses[fecha.getMonth()]);
    const [yearIni,setYearIni]=useState(fecha.getFullYear());
    
    const [diaFin,setDiaFin]=useState();
    const [mesFin,setMesFin]=useState();
    const [yearFin,setYearFin]=useState();

    useEffect(()=>{
        SetFecha(new Date(fecha.setDate(fecha.getDate()+3)))
        setDiaFin(fecha.getDate())
        setMesFin(Meses[fecha.getMonth()])
        setYearFin(fecha.getFullYear())
    },[])

    

    const handleNext = ()=>{ 
        setDiaIni(fecha.getDate())
        setMesIni(Meses[fecha.getMonth()])
        setYearIni(fecha.getFullYear())

        SetFecha(new Date(fecha.setDate(fecha.getDate()+6)))
        setDiaFin(fecha.getDate())
        setMesFin(Meses[fecha.getMonth()])
        setYearFin(fecha.getFullYear())
        setAction("next")
    }

    const handlePrev = ()=>{
        let prevFecha = fecha.getFullYear()+""+ 
        (fecha.getMonth().toString().length ==1 ? "0"+fecha.getMonth(): fecha.getMonth()) 
        +""+(fecha.getDate().toString().length ==1 ? "0"+fecha.getDate(): fecha.getDate())
        
        let actualFecha = (new Date).getFullYear()+""+ 
        ((new Date).getMonth().toString().length ==1 ? "0"+(new Date).getMonth(): (new Date).getMonth()) 
        +""+((new Date).getDate().toString().length ==1 ? "0"+(new Date).getDate(): (new Date).getDate())

        if( parseInt(prevFecha) > parseInt(actualFecha)){
            setDiaFin(fecha.getDate())
            setMesFin(Meses[fecha.getMonth()])
            setYearFin(fecha.getFullYear())
            
            SetFecha(new Date(fecha.setDate(fecha.getDate()-6)))
            setDiaIni(fecha.getDate())
            setMesIni(Meses[fecha.getMonth()])
            setYearIni(fecha.getFullYear())
            setAction("prev")
        }
    }

  return (
    <div className={'body'+(!isVisible ? " hidden" : "")}>
        <div className={'cont-calendario'}>
            <div className='cont-title-fecha'>
                <button onClick={handlePrev}><i className="fa-solid fa-backward"></i></button>
                <h2>{diaIni} {(mesIni == mesFin ?"": `de ${mesIni}`)} {(yearIni == yearFin ?"": `de ${yearIni}`)} - {diaFin} de {mesFin} de {yearFin}</h2>
                <button onClick={handleNext}><i className="fa-solid fa-forward"></i></button>
            </div>
            <DinamicFecha user={user} setVisible={setVisible} info={info} SetInfo={SetInfo} fecha={fecha} action={action}/>
        </div>

    </div>
  )
}

export default Calendario