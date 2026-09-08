const {redisClient} = require("../config/redis");

const getCache = async(key) => {                                      //Read data from Redis
    const data = await redisClient.get(key); 

    if(!data) return null;

    return JSON.parse(data);
}


const setCache = async(key, value, expiry = 300) => {                //Store data in Redis
    await redisClient.set(
        key, 
        JSON.stringify(value),
        {
            EX: expiry                                            //key will expire after 300 seconds (5 minutes).
        }
    )
}

const deleteCache = async(key) => {                                  //Remove data from Redis
    await redisClient.del(key);                                 
}

module.exports = {getCache, setCache, deleteCache};












