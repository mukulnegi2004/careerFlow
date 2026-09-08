const ExpressError = require("../utils/apiError");
const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().trim().required(),         //string => transform first (if convert:true), validation second   //trim is transform, required is for validation 
    email: Joi.string().trim().lowercase().email().required(),            //lowercase and trim transform, email and required is validation
    password: Joi.string().trim().min(6).required()
})

const validateRegister = (req, res, next) => {
    const {error, value} = registerSchema.validate(req.body, {                                 //value contains transform data
        abortEarly: false,                                                                    //joi returns all errors not only first
        stripUnknown: true                                                                    //remove unexpected/unrequired fields
    });             

    if(error){
        let errMsg = error.details.map((el) => el.message).join(", ");
        return next(new ExpressError(errMsg, 400));
    }

    req.body = value;                                         //replaces original request data with cleaned/transformed data from joi
    next();
}



const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().trim().min(6).required()
})


const validateLogin = (req, res, next) => {

    const {error, value} = loginSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if(error){
        const errMsg = error.details.map((el) => el.message).join(", ");
        return next(new ExpressError(errMsg, 400));
    }

    req.body = value;

    next();
};

module.exports = {validateRegister, validateLogin};