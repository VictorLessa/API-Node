require('dotenv').config() 
const app = require('./server/server.js');


var io = require('socket.io').listen(app.server)



io.sockets.on('connection', (socket)=>{
    console.log('entoru no socket')
    socket.on('disconect', (data)=>{

    })
})

app.listen(8080, ()=>{
    console.log('Funcionando');
});

