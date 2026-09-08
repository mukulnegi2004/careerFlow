const notificationService = require("../services/notification.service");

const getNotifications = async (req, res) => {
    const userId = req.user.userId;

    const notifications = await notificationService.getNotifications(userId);
    return res.status(200).json({
        success: true,
        notifications
    })
}

const markRead = async (req, res) => {
    const {notificationId} = req.params;

    await notificationService.markRead(notificationId, req.user.userId);
    res.status(200).json({
        success: true,
        message: "notification marked as read"
    })
}

module.exports = {getNotifications, markRead};






































