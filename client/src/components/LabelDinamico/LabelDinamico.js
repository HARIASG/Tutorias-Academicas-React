import React,{useState} from 'react';

const infoDinamicaVec= ["tu formacion","tu conocimeinto"]
const LabelDinamico = () => {
    const [infoDinamica,setInfoDinamica] = useState(infoDinamicaVec[0])
  
  setInterval(()=>{
    let segundo = new Date().getSeconds();
    if(segundo %2==0){
      setInfoDinamica(infoDinamicaVec[1]);
    }
    else{
      setInfoDinamica(infoDinamicaVec[0]);
    }
  },1000)
  return (
    <p>Fortalece {infoDinamica}</p>
  )
}

export default LabelDinamico