const ExpressError = require('../utils/apiError');


const required = [
    "MONGO_URI",
    "PORT",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "CLOUD_NAME",
    "CLOUD_API_KEY",
    "CLOUD_API_SECRET",
    "REDIS_URL", 
    "GROQ_API_KEY"
]

required.forEach((key) => {
    if(!process.env[key]){
        throw new ExpressError(`${key} is missing`, 500);
    }
});


















