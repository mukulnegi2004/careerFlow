const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {generateAccessToken, generateRefreshToken, verifyRefreshToken} = require("../utils/jwt");
const ExpressError = require("../utils/apiError");
const Connection = require("../models/connection.model");
const Post = require("../models/post.model");

const registerUser = async (data) => {
    const {name, email, password} = data;

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new ExpressError("user already exists", 409);
    }

    const hashedPass = await bcrypt.hash(password, 10);                //creates a hashed password + salt together, 10 = salt rounds

    const user = await User.create({
        name,
        email,
        password: hashedPass
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
}

const loginUser = async(data) => {
    const {email, password} = data;
    const user = await User.findOne({email});

    if(!user){
        throw new ExpressError("invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new ExpressError("invalid credentials", 401);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

const currUser = async(data) => {
    const user = await User.findById(data.userId).select("-password -refreshToken");
    if(!user){
        throw new ExpressError("user not found", 404);
    }

    const postsCount = await Post.countDocuments({author: data.userId});
    
    const connectionsCount = await Connection.countDocuments({
        status: "accepted",
        $or: [
            { sender: data.userId },
            { receiver: data.userId }
        ]
    });

    return {
        ...user.toObject(),
        postsCount,
        connectionsCount
    };
}

const refreshTokenUser = async(refreshToken) =>{
    if(!refreshToken){
        throw new ExpressError("Refresh Token Required", 400);
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if(!user){
        throw new ExpressError("User not found", 404)
    }

    if(user.refreshToken !== refreshToken){
        throw new ExpressError("Invalid refresh Token", 401);
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    return{
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}

const logoutUser = async (userId) => {
    const user = await User.findById(userId);

    if(!user){
        throw new ExpressError("user not found", 404)
    }

    user.refreshToken = null;

    await user.save();
}

module.exports = {registerUser, loginUser, currUser, refreshTokenUser, logoutUser};