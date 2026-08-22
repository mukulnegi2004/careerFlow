const mongoose = require("mongoose");


const connectionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true
})

connectionSchema.index({sender: 1, receiver: 1}, {unique: true});           // compound unique index, flow -> Step 1: Check index (B-tree search): finds same pair of sender-reciever exist,  Step 2: If found → reject insertion, Step 3: If not found then insert in collection + update index

module.exports = mongoose.model("Connection", connectionSchema);
































