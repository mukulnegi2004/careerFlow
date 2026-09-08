const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({                         //two-person chat system
    participants: [                                              //contain the IDs of the two users, sender and receiver involved in this chat
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ]
}, {
    timestamps: true
})


module.exports = mongoose.model("Chat", chatSchema);


























