const port = process.env.PORT || 3000;

const express = require('express')
const app = express()
const http = require('http')
let server = http.createServer(app)
const socketIO = require('socket.io')

const path = require('path')
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

module.exports.io = socketIO(server);  //Comunicacion del backend
require('./socket/socket')

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${port}`);

});