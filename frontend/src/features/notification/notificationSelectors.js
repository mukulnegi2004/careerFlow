import { createSelector } from "@reduxjs/toolkit";

const selectNotifications = (state) =>
    state.notification.notifications;

const selectNotificationLoading = (state) =>
    state.notification.loading;

const selectNotificationError = (state) =>
    state.notification.error;

const selectUnreadNotifications = createSelector(
    [selectNotifications],
    (notifications) =>
        notifications.filter(
            (notification) => !notification.isRead
        )
);

const selectReadNotifications = createSelector(
    [selectNotifications],
    (notifications) =>
        notifications.filter(
            (notification) => notification.isRead
        )
);

export {
    selectNotifications,
    selectNotificationLoading,
    selectNotificationError,
    selectUnreadNotifications,
    selectReadNotifications
};