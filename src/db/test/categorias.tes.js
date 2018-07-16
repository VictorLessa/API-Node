import test from 'ava'

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

 const categorias = require('../categorias')({connection, errorHandler})

test('foo', t => {
	t.pass()
})
