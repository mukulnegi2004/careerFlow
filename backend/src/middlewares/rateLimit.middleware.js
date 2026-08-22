const rateLimit = require("express-rate-limit");                //package automatically counts how many requests a client makes


const limiter = rateLimit({
    windowMs: 15*60*1000,                                       //time window, Count requests made within the last 15 minutes.
    max: 1000,                                                    //Allow at most 100 requests from one IP during those 15 minutes.
    message:{                                                   // When the limit is exceeded, Express automatically sends this response
        success: false,
        message: "Too many request, try again later"
    }
})

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,                                        // 15 minutes
    max: 15,                                                          // Allow only 15 login attempts in 15 min
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    }
});


module.exports = {limiter, loginLimiter};





