const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",                                                                   //says this ID belongs to the User model
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    image: {                                                                            //image path (URL) came from cloudinary
        type: String,
        default: ""
    },
    filename: {                                                                         // filename used in cloudinary to upload image
        type: String,
        default: ""
    },
    likes: [                                                                             //stores users ID who liked the post
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);