const ExpressError = require("../utils/apiError");
const Joi = require("joi");


const commentSchema = Joi.object({
    text: Joi.string().trim().max(500).required()
})

const validateComment = (req, res, next) => {
    const {error, value} = commentSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    })

    if(error){
        let errMsg = error.details.map((el) => el.message).join(", ");
        return next(new ExpressError(errMsg, 400));
    }

    req.body = value;
    next();
}

module.exports = validateComment;




















