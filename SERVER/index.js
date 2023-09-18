//Importando librerias
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//Generar las instancias
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//Enviar de manera estatica el contenido de public
app.use(express.static(__dirname + '/public'));

//Detectamos la conexion de un nuevo cliente
io.on('connection', (socket)=>{
    //Informamos a conexion de un nuevo cliente
    console.log('Un cliente se ha conectado')
    //Detectamos la recepcion de un mensaje con el tag: "enviar-elemento"
    socket.on('enviar-elemento', (elemento)=>{
        //Transmitir el elemento a todos los clientes, incluido el remitente
        console.log(elemento)
        io.emit('elemento-recibido', elemento);
    });
    //Detectamos  la recepcion de un mensaje con el tag: "enviar-cursor"
    socket.on('enviar-cursor', (elemento)=>{
        //Transmitir elemento a todos los clientes, incluido el remitente
        io.emit('cursor-recibido', elemento);
    });
    //Detectamos el cambio de estado a desconectado
    socket.on('diconnect', ()=>{
        //Informamos de la desconexion de un cliente
        console.log('Un cliente se ha desconectado');
    });
});

server.listen(3000, ()=>{
    console.log('Servidor escuchando en el puerto 3000')
});