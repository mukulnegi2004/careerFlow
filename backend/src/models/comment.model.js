const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,                                                                //convert to string, type casting
        required: true,
        trim: true,                                                                  //trim and save
        maxlength: 500                                                               //validate
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema);























