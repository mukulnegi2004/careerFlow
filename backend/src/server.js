require("dotenv").config();
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const http = require('http');                                       //Express alone isn't enough because Socket.IO attaches itself to an HTTP server
const app = require('./app');                                       //Express backend (routes + middleware)
const {Server} = require("socket.io");                              //importing Socket.IO server class
const initsocket = require("./sockets/index")
const server = http.createServer(app);                              //converts Express app into a real HTTP server

 
const io = new Server(server, {                                    // io is main server object created by Socket.IO library, It manages all socket connections and lets you send/receive events between the server and connected clients.               
    cors:{
        origin: process.env.FRONTEND_URL,
        credentials: true
    },
});


initsocket(io);                                                   //passes the Socket.IO server to your socket setup

module.exports = server;


