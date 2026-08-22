const jwt = require("jsonwebtoken");
const EVENTS = require("./event");
const User = require("../models/user.model");
const ExpressError = require("../utils/apiError");


const {presenceSocket} = require("./presence.socket");
const {registerChatEvents} = require("./chat.socket");

const initSocket = (io) => { 
    io.use(                             //authentication middleware for sockets using a token, middleware runs before the connection is accepted
        async(socket, next) => {                                            //socket => individual connected client's socket object
            try{
                const token = socket.handshake.auth.token;
                console.log(token);

                if(!token){
                    throw new ExpressError("unauthorized", 400);
                }
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

                const user = await User.findById(decoded.userId);

                if(!user){
                    throw new ExpressError("user not found", 400);
                }

                socket.user = user;
                next();
            }catch(err){
                next(err);
            }
        }
    );
    io.on(EVENTS.CONNECTION , (socket) => {             // If authentication succeeds, the server executes and brand new socket object is created,listens for new client connections, Each user gets unique socket connection (socket.id = "KJH23x7"), client automatically receives (Socket.IO emits it automatically.)
        console.log(`socket connected ${socket.id}`);

        presenceSocket(io, socket);                           //presence events

        registerChatEvents(io, socket);                        //chat events
    })
}


module.exports = initSocket;












