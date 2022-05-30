let config = require("../db/dbconfig");
const sql = require("mssql");

const reservarTutoria = async (datos)=>{
    try{
        
        let pool = await sql.connect(config);
        let tutoria = await pool.request()
        .input("id_tutor",sql.BigInt,datos.id_tutor)
        .input("id_estudiante",sql.BigInt,datos.id_estudiante)
        .input("fecha",sql.VarChar,datos.fecha)
        .execute("[ReservarTutoria]")
        return tutoria.recordset;
    }
    catch(error){
        return error
    }
}


const tutoriasReservadas = async (id_tutor)=>{
    try{

        let pool = await sql.connect(config);
        let tutoria = await pool.request().query(`select fecha from TutoriasReservadas where id_tutor= ${id_tutor}`)
        return tutoria.recordset;
    }
    catch(error){
        return error
    }
}

const consultarTutorias = async (datos)=>{
    try{

        let pool = await sql.connect(config);
        let tutorias = await pool.request()
        .input("id",sql.BigInt,datos.id)
        .input("op",sql.Char,datos.op)
        .execute("[consultarTutorias]")
        return tutorias.recordset;
    }
    catch(error){
        return error
    }
}

const cancelarTutoria = async (id)=>{
    try{

        let pool = await sql.connect(config);
        let tutorias = await pool.request().query("DELETE FROM TutoriasReservadas where id = "+id)
        return tutorias.recordset;
    }
    catch(error){
        return error
    }
}


module.exports = {
   reservarTutoria,
   tutoriasReservadas,
   consultarTutorias,
   cancelarTutoria
}