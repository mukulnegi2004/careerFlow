import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
    fetchNotifications,
    markAsRead
} from "../features/notification/notificationAPI";

import {
    selectUnreadNotifications,
    selectReadNotifications,
    selectNotificationLoading,
    selectNotificationError
} from "../features/notification/notificationSelectors";

dayjs.extend(relativeTime);


// --------------------------------------------------
// Notification message
// --------------------------------------------------

const getNotificationMessage = (notification) => {

    const senderName = notification.sender?.name || "Someone";

    switch (notification.type) {

        case "connection_request":
            return (
                <>
                    <span className="font-semibold text-gray-900">
                        {senderName}
                    </span>{" "}
                    sent you a connection request
                </>
            );

        case "connection_accepted":
            return (
                <>
                    <span className="font-semibold text-gray-900">
                        {senderName}
                    </span>{" "}
                    accepted your connection request
                </>
            );

        case "like":
            return (
                <>
                    <span className="font-semibold text-gray-900">
                        {senderName}
                    </span>{" "}
                    liked your post
                </>
            );

        case "comment":
            return (
                <>
                    <span className="font-semibold text-gray-900">
                        {senderName}
                    </span>{" "}
                    commented on your post
                </>
            );

        case "message":
            return (
                <>
                    <span className="font-semibold text-gray-900">
                        {senderName}
                    </span>{" "}
                    sent you a message
                </>
            );

        default:
            return (
                <>
                    <span className="font-semibold text-gray-900">
                        {senderName}
                    </span>{" "}
                    interacted with you
                </>
            );
    }
};


// --------------------------------------------------
// Notification icon
// --------------------------------------------------

const getNotificationIcon = (type) => {

    switch (type) {

        case "connection_request":
            return "👤";

        case "connection_accepted":
            return "🤝";

        case "like":
            return "❤️";

        case "comment":
            return "💬";

        case "message":
            return "✉️";

        default:
            return "🔔";
    }
};


// --------------------------------------------------
// Notification Item
// --------------------------------------------------

function NotificationItem({
    notification,
    onMarkAsRead
}) {

    const sender = notification.sender;

    const hasPostImage =
        (notification.type === "like" ||
            notification.type === "comment") &&
        notification.post?.image;


    return (
        <div
            className={`
                flex
                items-center
                gap-4
                px-5
                py-4
                border-b
                border-gray-100
                transition
                duration-200

                ${
                    !notification.isRead
                        ? "bg-blue-50/60 hover:bg-blue-50"
                        : "bg-white hover:bg-gray-50"
                }
            `}
        >

            {/* -------------------------------- */}
            {/* Sender Profile */}
            {/* -------------------------------- */}

            <div className="relative shrink-0">

                {sender?.profileImage ? (

                    <img
                        src={sender.profileImage}
                        alt={sender.name || "User"}
                        className="
                            w-12
                            h-12
                            rounded-full
                            object-cover
                            border
                            border-gray-200
                        "
                    />

                ) : (

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            border
                            border-gray-200
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            text-lg
                            font-semibold
                            text-gray-600
                        "
                    >
                        {sender?.name
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                    </div>

                )}


                {/* Notification type badge */}

                <div
                    className="
                        absolute
                        -bottom-1
                        -right-1
                        w-6
                        h-6
                        rounded-full
                        bg-white
                        border
                        border-gray-200
                        flex
                        items-center
                        justify-center
                        text-xs
                        shadow-sm
                    "
                >
                    {getNotificationIcon(notification.type)}
                </div>

            </div>


            {/* -------------------------------- */}
            {/* Notification Content */}
            {/* -------------------------------- */}

            <div className="flex-1 min-w-0">

                <p
                    className={`
                        text-sm
                        leading-5
                        ${
                            !notification.isRead
                                ? "text-gray-900"
                                : "text-gray-600"
                        }
                    `}
                >
                    {getNotificationMessage(notification)}
                </p>


                {/* Time */}

                <p className="
                    text-xs
                    text-gray-400
                    mt-1
                ">
                    {dayjs(notification.createdAt).fromNow()}
                </p>


                {/* Mark as read */}

                {!notification.isRead && (

                    <button
                        onClick={() =>
                            onMarkAsRead(
                                notification._id
                            )
                        }
                        className="
                            mt-2
                            text-xs
                            font-medium
                            text-blue-600
                            hover:text-blue-700
                            hover:underline
                            cursor-pointer
                        "
                    >
                        Mark as read
                    </button>

                )}

            </div>


            {/* -------------------------------- */}
            {/* Post Image */}
            {/* -------------------------------- */}

            {hasPostImage && (

                <img
                    src={notification.post.image}
                    alt="Post"
                    className="
                        w-16
                        h-16
                        rounded-lg
                        object-cover
                        border
                        border-gray-200
                        shrink-0
                    "
                />

            )}


            {/* -------------------------------- */}
            {/* Unread Indicator */}
            {/* -------------------------------- */}

            {!notification.isRead && (

                <div
                    className="
                        w-2
                        h-2
                        rounded-full
                        bg-blue-600
                        shrink-0
                    "
                />

            )}

        </div>
    );
}


// --------------------------------------------------
// Empty State
// --------------------------------------------------

function EmptyState({ text }) {

    return (
        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                py-12
                text-center
            "
        >

            <div
                className="
                    w-14
                    h-14
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-2xl
                    mb-3
                "
            >
                🔔
            </div>

            <p className="
                text-sm
                text-gray-500
            ">
                {text}
            </p>

        </div>
    );
}


// --------------------------------------------------
// Loading Skeleton
// --------------------------------------------------

function NotificationSkeleton() {

    return (

        <div className="
            bg-white
            rounded-xl
            border
            border-gray-200
            overflow-hidden
        ">

            {[1, 2, 3, 4].map((item) => (

                <div
                    key={item}
                    className="
                        flex
                        items-center
                        gap-4
                        p-5
                        border-b
                        border-gray-100
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            bg-gray-200
                            animate-pulse
                        "
                    />

                    <div className="flex-1">

                        <div
                            className="
                                h-4
                                bg-gray-200
                                rounded
                                w-3/4
                                animate-pulse
                                mb-2
                            "
                        />

                        <div
                            className="
                                h-3
                                bg-gray-200
                                rounded
                                w-20
                                animate-pulse
                            "
                        />

                    </div>

                </div>

            ))}

        </div>
    );
}


// --------------------------------------------------
// Notifications Page
// --------------------------------------------------

function Notifications() {

    const dispatch = useDispatch();


    const unreadNotifications = useSelector(
        selectUnreadNotifications
    );

    const readNotifications = useSelector(
        selectReadNotifications
    );

    const loading = useSelector(
        selectNotificationLoading
    );

    const error = useSelector(
        selectNotificationError
    );


    // ----------------------------------------------
    // Fetch notifications
    // ----------------------------------------------

    useEffect(() => {

        dispatch(fetchNotifications());

    }, [dispatch]);


    // ----------------------------------------------
    // Mark as read
    // ----------------------------------------------

    const handleMarkAsRead = (notificationId) => {

        dispatch(
            markAsRead(notificationId)
        );

    };


    // ----------------------------------------------
    // Loading
    // ----------------------------------------------

    if (loading) {

        return (

            <div className="
                max-w-3xl
                mx-auto
                px-4
                py-6
            ">

                <div className="
                    h-8
                    w-48
                    bg-gray-200
                    rounded
                    animate-pulse
                    mb-6"
                />

                <NotificationSkeleton />

            </div>

        );
    }


    // ----------------------------------------------
    // Error
    // ----------------------------------------------

    if (error) {

        return (

            <div className="
                max-w-3xl
                mx-auto
                px-4
                py-6
            ">

                <div className="
                    bg-red-50
                    border
                    border-red-200
                    text-red-600
                    rounded-xl
                    p-4
                    text-sm
                ">
                    {error}
                </div>

            </div>
        );
    }


    // ----------------------------------------------
    // UI
    // ----------------------------------------------

    return (

        <div className="
            max-w-3xl
            mx-auto
            px-4
            py-6
        ">


            {/* ===================================== */}
            {/* Header */}
            {/* ===================================== */}

            <div className="mb-6">

                <h1 className="
                    text-2xl
                    font-bold
                    text-gray-900
                ">
                    Notifications
                </h1>

                <p className="
                    text-sm
                    text-gray-500
                    mt-1
                ">
                    Stay updated with your latest activity
                </p>

            </div>


            {/* ===================================== */}
            {/* UNREAD */}
            {/* ===================================== */}

            <section className="mb-8">

                <div className="
                    flex
                    items-center
                    gap-2
                    mb-3
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-900
                    ">
                        Unread
                    </h2>


                    <span className="
                        min-w-6
                        h-6
                        px-2
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-xs
                        font-semibold
                        flex
                        items-center
                        justify-center
                    ">
                        {unreadNotifications.length}
                    </span>

                </div>


                <div className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-200
                    overflow-hidden
                    shadow-sm
                ">

                    {unreadNotifications.length === 0 ? (

                        <EmptyState
                            text="You're all caught up!"
                        />

                    ) : (

                        unreadNotifications.map(
                            (notification) => (

                                <NotificationItem
                                    key={notification._id}
                                    notification={notification}
                                    onMarkAsRead={
                                        handleMarkAsRead
                                    }
                                />

                            )
                        )

                    )}

                </div>

            </section>


            {/* ===================================== */}
            {/* READ */}
            {/* ===================================== */}

            <section>

                <div className="mb-3">

                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-900
                    ">
                        Earlier
                    </h2>

                </div>


                <div className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-200
                    overflow-hidden
                    shadow-sm
                ">

                    {readNotifications.length === 0 ? (

                        <EmptyState
                            text="No read notifications yet"
                        />

                    ) : (

                        readNotifications.map(
                            (notification) => (

                                <NotificationItem
                                    key={notification._id}
                                    notification={notification}
                                    onMarkAsRead={
                                        handleMarkAsRead
                                    }
                                />

                            )
                        )

                    )}

                </div>

            </section>

        </div>
    );
}


export default Notifications;