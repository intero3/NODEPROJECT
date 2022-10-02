const path = require('path');
const http = require('http');
const express = require('express');
const mysql = require('mysql');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const db_connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'TunD3rb456',
    database: 'chatuser'
})


// static folder
app.use(express.static(path.join(__dirname, 'client')));

// client connection

io.on('connection', socket => {
    // emit msg: welcome
    
    socket.emit('message', `Willkommen im Chat!`);

    // id

    socket.emit('message', `You connected with id: ${socket.id}`);

    socket.broadcast.emit('message', `Ein neuer Benutzer ist dem Chat beigetreten! `);

    socket.on('chat_msg', (message) =>{
        io.emit('message', message);
    })

    socket.on('message', () =>{
        io.emit('dc_msg', `Benutzer mit ID ${socket.id} hat den Chat verlassen!`);
    })
})


const PORT = 300 || process.env.PORT;

server.listen(PORT, () => console.log(`console running on port ${PORT}`));

