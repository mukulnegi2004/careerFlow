const authService = require("../services/auth.service");

const register = async (req, res) => {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
        success: true,
        message: "user registered successfully",
        ...result
    })
}

const login = async (req, res) => {
    const result = await authService.loginUser(req.body);

    return res.status(200).json({
        success: true,
        message: "login successfully",
        ...result
    })
}

const me = async (req, res) => {
    const user = await authService.currUser(req.user);

    return res.status(200).json({
        success: true,
        user
    });
}

const refresh = async (req, res) => {
    const {refreshToken} = req.body;
    const result = await authService.refreshTokenUser(refreshToken);

    res.status(200).json({
        success: true,
        ...result
    })
}

const logout = async (req, res) => {
    await authService.logoutUser(req.user.userId);

    return res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
}

module.exports = { register, login, me, refresh, logout };