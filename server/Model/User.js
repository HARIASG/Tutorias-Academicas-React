const bcrypt = require("bcryptjs");
let config = require("../db/dbconfig");
const sql = require("mssql");


const userSave = async (newUser)=>{
    try{
        
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input("id",sql.BigInt,newUser.id || null)
        .input("nombres",sql.VarChar,newUser.nombres)
        .input("apellidos",sql.VarChar,newUser.apellidos)
        .input("cedula",sql.BigInt,newUser.cedula)
        .input("celular",sql.BigInt,newUser.celular)
        .input("fotoPerfil",sql.VarBinary,(Buffer.from(newUser.fotoPerfil)))
        .input("correoElec",sql.VarChar,newUser.correo)
        .input("idMateria",sql.BigInt,newUser.materia ||null)
        .input("horario",sql.VarChar,newUser.fechasSelect||null)
        .input("password",sql.VarBinary,(Buffer.from(newUser.password)))
        .input("tipoUser",sql.Char,newUser.tipoUser)
        .input("descripcion",sql.VarChar,newUser.descripcion || null)
        .execute("[userSave]");
        // console.log(user.recordsets) //esto devuelve varios select
        // console.log(user.recordsets[0])
        // console.log(user.recordsets[1])
        return user.recordset; //esto devuelve un solo select
    }
    catch(error){
        return error
    }
}

const userState = async (id)=>{
    try{

        let pool = await sql.connect(config);
        let user = await pool.request().query("update usuario set estado = 1 where id ="+id)
        return user.recordset;
    }
    catch(error){
        return error
    }
}

const passwordGet = async (correo)=>{
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input("correoElec",sql.VarChar,correo)
        .execute("[Login]")
        return user.recordset;
    }
    catch(error){
        return error
    }
}

const tutoresXmateria = async (id_materia)=>{
    try{
        let pool = await sql.connect(config);
        let tutores = await pool.request().query(`SELECT * FROM usuario WHERE id_materia =${id_materia}`)
        return tutores.recordset
    }
    catch(err){
        return err
    }
}

const estudiantesAsig = async (id_tutor)=>{
    try{
        let pool = await sql.connect(config);
        let estudiantes = await pool.request()
        .query(`SELECT T.id_estudiante,U.nombreCompleto,U.fotoPerfil FROM TutoriasReservadas T INNER JOIN usuario U on T.id_estudiante= U.id WHERE T.id_tutor =${id_tutor} group by T.id_estudiante,U.nombreCompleto,U.fotoPerfil`)
        return estudiantes.recordset
    }
    catch(err){
        return err
    }
}

module.exports = {
    userSave,
    userState,
    passwordGet,
    tutoresXmateria,
    estudiantesAsig
}