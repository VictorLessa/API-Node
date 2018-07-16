 
 const mysql = require('mysql')


 const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
 })

 const errorHandler = (error, msg, rejectFunction)=> {
    console.error(error)
    rejectFunction({error: msg})
 }  

 const sql = require('./sql')({ connection, errorHandler })
 //primeiro parametro é o proprio metodo em si e o segundo uma array ou um metodo de callback

module.exports = {
    sql: () => sql,

    
}