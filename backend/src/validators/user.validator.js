const Joi = require("joi");
const { cloudinary } = require("../config/cloudinary");
const ExpressError = require("../utils/apiError");

const educationSchema = Joi.object({
    institute: Joi.string().trim().required(),
    degree: Joi.string().trim().required(),
    fieldOfStudy: Joi.string().trim().allow(""),
    startYear: Joi.number().integer(),
    endYear: Joi.number().integer(),
    grade: Joi.string().trim().allow(""),
    description: Joi.string().trim().allow("")
});

const experienceSchema = Joi.object({
    company: Joi.string().trim().required(),
    role: Joi.string().trim().required(),
    employmentType: Joi.string().valid("Full-time", "Part-time", "Internship", "Freelance", "Contract"),
    location: Joi.string().trim().allow(""),
    startDate: Joi.date(),
    endDate: Joi.date(),
    currentlyWorking: Joi.boolean(),
    description: Joi.string().trim().allow(""),
    skillsUsed: Joi.array().items(Joi.string().trim())
});

const userSchema = Joi.object({
    name: Joi.string().trim().allow(""),
    headline: Joi.string().trim().allow(""),
    bio: Joi.string().trim().allow(""),

    skills: Joi.array().items(Joi.string().trim()),
    education: Joi.array().items(educationSchema),
    experience: Joi.array().items(experienceSchema)
});


const validateUser = async (req, res, next) => {
    try {                         // In multipart/form-data, arrays/objects arrive as JSON strings, For application/json requests, express.json() parses them automatically.
        if (req.body.skills) {
            req.body.skills = JSON.parse(req.body.skills);
        }

        if (req.body.education) {
            req.body.education = JSON.parse(req.body.education);
        }

        if (req.body.experience) {
            req.body.experience = JSON.parse(req.body.experience);
        }
    } catch (err) {
        if (req.file) {
            try {
                await cloudinary.uploader.destroy(req.file.filename);
            } catch (deleteErr) {
                console.error("Cloudinary cleanup failed:", deleteErr);
            }
        }

        return next(new ExpressError("Invalid JSON format.", 400));
    }

    const { error, value } = userSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    })

    if (error) {
        if (req.file) {
            try {
                await cloudinary.uploader.destroy(req.file.filename);
            } catch (deleteErr) {
                console.log("cloudinary cleanup failed", deleteErr)
            }
        }

        let errMsg = error.details.map((el) => el.message).join(", ");
        return next(new ExpressError(errMsg, 400));
    }

    req.body = value;
    next();
}


module.exports = validateUser;






