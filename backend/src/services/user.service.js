const User = require("../models/user.model");
const Post = require("../models/post.model");
const Connection = require("../models/connection.model");
const ExpressError = require("../utils/apiError");
const {cloudinary} = require("../config/cloudinary");

const updateUserProfile = async (userId, data, file) => {
    const user = await User.findById(userId);
    if(!user){
        throw new ExpressError("user not found", 404);
    }

    const updates = {};

    const allowedFields = [
        "name",
        "headline",
        "bio",
        "skills",
        "education",
        "experience"
    ];

    allowedFields.forEach((field) => {
        if(data[field] !== undefined){
            updates[field] = data[field];
        }
    })

    let oldFilename = null;

    if (file) {
        oldFilename = user.filename;

        updates.profileImage = file.path;
        updates.filename = file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updates,
        {
            new: true,
            runValidators: true
        }
    ).select("-password -refreshToken");

    if (file && oldFilename) {
        try {
            await cloudinary.uploader.destroy(oldFilename);
        } catch (deleteErr) {
            console.log("Old Cloudinary image cleanup failed:", deleteErr);
        }
    }

    return updatedUser;
}

const getAllUsers = async (currentUserId, page, limit) => {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const skip = (page - 1) * limit;
    const filter = {
        _id: { $ne: currentUserId }
    };

    const users = await User.find(filter)
        .select("name headline profileImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalUsers = await User.countDocuments(filter);

    return {
        users,
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
    };
};

const searchUsers = async(currentUserId, query) =>{
    const search = query.q?.trim() || "";

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;

    const skip = (page - 1) * limit;

    const filter = {
        _id: {$ne: currentUserId}                           //$ne means not equal so it return everyone except current user
    }

    if(search){                                            //If search isn't empty, $regex performs pattern matching.
        filter.name = {
            $regex: search,
            $options: "i"                       //case insensitive
        }
    }

    const users = await User.find(filter)
        .select("name headline profileImage")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

    const totalUsers = await User.countDocuments(filter);

    return {
        users,
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
    };
}

const getUserProfile = async(currUserId, userId) => {
    const user = await User.findById(userId).select("-password -refreshToken");

    if(!user){
        throw new ExpressError("user not found", 404);
    }

    const postsCount = await Post.countDocuments({author: userId});

    const connectionsCount = await Connection.countDocuments({
        status: "accepted",
        $or: [
            {sender: userId},
            {receiver: userId}
        ]
    })

    let connectionStatus = "none";                                        //connection status with logged in user

    if (currUserId.toString() === userId.toString()) {                    //if curr user search for self profile
        connectionStatus = "self";
    } else {
        const connection = await Connection.findOne({
            $or: [
                { sender: currUserId, receiver: userId },
                { sender: userId, receiver: currUserId }
            ]
        });
    
        if (connection) {
            connectionStatus = connection.status;
        }
    }

    return {
        ...user.toObject(),
        postsCount,
        connectionsCount,
        connectionStatus
    }

}

module.exports = {updateUserProfile, getAllUsers, searchUsers, getUserProfile};



















