const Notification = require("../models/notification.model");

const getNotifications = async(userId) => {
    const notifications = await Notification.find({receiver: userId})                       
        .populate("sender receiver", "name headline profileImage")                                                  //populate sender and post field
        .populate("post", "content image author")
        .sort({createdAt: -1});

    return notifications;
}

const markRead = async(notificationId, userId) => {
    await Notification.findOneAndUpdate({_id: notificationId, receiver: userId}, {isRead: true});
}

module.exports = {getNotifications, markRead};























































