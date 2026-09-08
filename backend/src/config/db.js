const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);                                                  // Exit process with failure, stops the entire Node.js process
    }
}

module.exports = connectDb;