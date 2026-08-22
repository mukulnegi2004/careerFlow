const {redisClient} = require("../config/redis");

const inValidateFeed = async (userId) => {
    const keys = await redisClient.keys(`feed:${userId}:*`);         // Returns all Redis keys as array that start with "feed:userId:"

    if(keys.length > 0){
        await redisClient.del(...keys);                            //pass all keys as seperate argument, Deletes all keys
    }
}

module.exports = inValidateFeed;











