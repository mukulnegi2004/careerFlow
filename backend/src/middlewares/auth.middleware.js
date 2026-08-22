const jwt = require("jsonwebtoken");
const ExpressError  = require("../utils/apiError");
const {verifyAccessToken} = require("../utils/jwt");

const auth = async(req, res, next) => {
    try{ 
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return next(new ExpressError("unauthorized", 401));
        }

        const decoded = verifyAccessToken(token);          //converting the token back into its payload data, checks: Is token genuine?, Was token signed using your secret?, Has token expired?

        req.user = decoded;                                              //Adds user data to request, later controllers can use: req.user.userId
        next();

    }catch(err){
        return next(new ExpressError("Token expired", 401));
    }
};

module.exports = auth;






























