const  EVENTS = require("./event");

const onlineUsers = new Map();                         //maintains socket connected to which userId

const presenceSocket = (io, socket) => {
    const userId = socket.user._id.toString();

    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);

    const onlineUserIds = [...onlineUsers.keys()];
    socket.emit(EVENTS.ONLINE_USERS, onlineUserIds);                    //to return all online users to curr online person

    io.emit(EVENTS.USER_ONLINE, {userId});          //sends the event to every socket (online person) currently connected to the Socket.IO server, show userID is online

    socket.on(EVENTS.DISCONNECT, () => {                 //it fires: User closes browser/tab , Client manually disconnects, Internet connection is lost
        onlineUsers.delete(userId);
        io.emit(EVENTS.USER_OFFLINE, {userId});       //sends the event to every socket (online person) currently connected to the Socket.IO server, show userID is offline
        console.log(`user disconnected: ${userId}`)
    })
}

module.exports = {presenceSocket, onlineUsers};































