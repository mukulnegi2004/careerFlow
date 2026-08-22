const ExpressError = require("../utils/apiError")
const Joi = require("joi");
const { cloudinary } = require("../config/cloudinary")

const postSchema = Joi.object({
    content: Joi.string().trim().required()
})


const validatePost = async (req, res, next) => {
    const { error, value } = postSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    })

    if (error) {
        if (req.file) {                                   //if validation fails to post than remove uploaded image file from cloudinary
            try {
                await cloudinary.uploader.destroy(req.file.filename);          // filename => name used for storing/uploading in cloudinary                  
            } catch (deleteErr) {
                console.error("Cloudinary cleanup failed:", deleteErr);
            }
        }
        let errMsg = error.details.map((el) => el.message).join(", ");
        return next(new ExpressError(errMsg, 400));
    }

    req.body = value;

    next();
}




module.exports = validatePost;










