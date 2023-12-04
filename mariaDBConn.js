const mariadb = require('mariadb')
const vals = require('./consts.js')

const pool = mariadb.createPool({
    host : vals.DBHost, port : vals.DBPort, user : vals.DBUser, password : vals.DBPass, connectionLimit : vals.connectionLimit
})

async function GetUserList(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('use nodejs_test');
        rows = await conn.query('select * from users');
    }
    catch(err){
        throw err;
    }
    finally{
        if(conn) conn.end();
        return rows[0];
    }
}

module.exports = {
    getuserList : GetUserList
}