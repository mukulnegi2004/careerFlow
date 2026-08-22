const userService = require("../services/user.service");

const updateProfile = async (req, res) => {
    const user = await userService.updateUserProfile(req.user.userId, req.body, req.file);

    return res.status(200).json({
        success: true,
        message: "profile updated successfully",
        user
    })

};

const getAllUsers = async(req, res) => {
    const {page, limit} = req.query;
    
    const users = await userService.getAllUsers(req.user.userId, page, limit);
    return res.status(200).json({
        success: true,
        ...users
    })
}

const searchUsers = async(req, res) => {
    const users = await userService.searchUsers(req.user.userId, req.query);

    res.status(200).json({
        success: true,
        ...users
    })
}


const getUserProfile = async(req, res) => {
    const result = await userService.getUserProfile(req.user.userId, req.params.userId);

    return res.status(200).json({
        success: true,
        data: result
    })
}
module.exports = {updateProfile, getAllUsers, searchUsers, getUserProfile};




















