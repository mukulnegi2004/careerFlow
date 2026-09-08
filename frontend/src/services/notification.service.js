import api from "./axios";

const getNotifications = () => api.get("/notifications");

const markNotificationRead = (notificationId) => api.patch(`/notifications/${notificationId}/read`);

export { getNotifications, markNotificationRead};