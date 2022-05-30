let config = require("../db/dbconfig");
const sql = require("mssql");

const consultarMaterias = async ()=>{
    try{
        let pool = await sql.connect(config);
        let materias = await pool.request().query("select id,nombre from materia order by id desc");
        return materias.recordset;
    }
    catch(error){
        return error
    }
}

module.exports = {
    consultarMaterias
}