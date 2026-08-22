const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    institute: {
        type: String,
        required: true,
        trim: true
    },
    degree: {
        type: String,
        required: true,
        trim: true
    },
    fieldOfStudy: {
        type: String,
        default: "",
        trim: true
    },
    startYear: {
        type: Number
    },
    endYear: {
        type: Number
    },
    grade: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    }
})


const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    employmentType: {
        type: String,
        enum: [
            "Full-time",
            "Part-time",
            "Internship",
            "Freelance",
            "Contract",
        ],
        default: "Full-time",
    },
    location: {
        type: String,
        default: "",
    },
    startDate: {
        type: Date,                                                              //JavaScript Date object
    }, 
    endDate: {
        type: Date,
    },
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: "",
    },
    skillsUsed: {
        type: [String],
        default: [],
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,                                          //performs casting (transformation), convert to string and than validates
        required: true,                                        //validate
        trim: true                                             //Removes spaces from start and end and store modified value in DB
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,                                       //Converts value before saving
        unique: true                                           //Creates a unique index
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    headline: {
        type: String,
        default: "",
        trim: true
    },
    bio: {
        type: String,
        default: "",
        trim: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    filename: {                                                                         // filename used in cloudinary to upload image
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: [],
    },
    education: {
        type: [educationSchema],                 //[] means an array, so this field can contain multiple documents that follow educationSchema
        default: [],
    },
    experience: {
        type: [experienceSchema],
        default: []
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);











