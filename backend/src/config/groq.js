const Groq = require("groq-sdk");                           //Groq is a class (like a blueprint for creating objects)


const groq = new Groq({                                 //creates an object (instance) from the Groq class
    apiKey: process.env.GROQ_API_KEY,                   //SDK stores this API key and automatically sends it with every request
});

module.exports = groq;


