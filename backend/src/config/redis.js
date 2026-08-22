const {createClient} = require("redis");            //createClient() is used to create a Redis client that can communicate with the Redis server

const redisClient = createClient({
    url: process.env.REDIS_URL
})

redisClient.on("connect", () => {                 //Registers an event listener, When Redis successfully connects, this callback runs.
    console.log("Redis connected");
})

redisClient.on("error", (err) => {               //Listens for connection errors.
    console.log(err);
})

const connectRedis = async() => {
    await redisClient.connect();
}



module.exports = {connectRedis, redisClient};






