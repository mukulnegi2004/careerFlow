const ExpressError = require("../utils/apiError");
const Joi = require("joi");

const improvePostSchema = Joi.object({
    content: Joi.string().trim().required()
})

const validateImprovePost = (req, res, next) => {

    const {error, value} = improvePostSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if(error){
        let errMsg = error.details.map((ele) => ele.message).join(",");
        return next(new ExpressError(errMsg, 400));
    }
    req.body = value;
    next();
}



const careerChatSchema = Joi.object({
    message: Joi.string().trim().min(2).max(1000).required()
});

const validateCareerChat = (req, res, next) => {

    const { error, value } = careerChatSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const errMsg = error.details
            .map((ele) => ele.message)
            .join(", ");

        return next(new ExpressError(errMsg, 400));
    }

    req.body = value;

    next();
};

module.exports ={validateImprovePost, validateCareerChat};






