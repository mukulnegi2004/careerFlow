require("dotenv").config();                                //loads the variables from your .env file into process.env
require("./config/env");                                   //Whenever Node executes, it immediately runs every line in that file, validates your environment variables when it is imported

const connectDb = require("./config/db");
const { connectRedis } = require("./config/redis");
const server = require("./server");

const port = process.env.PORT || 5000;



const startServer = async () => {
    await connectDb();                                                       // Connect to the database
    await connectRedis();
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();


































