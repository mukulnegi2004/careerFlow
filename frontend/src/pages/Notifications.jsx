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

import {
    FaBell,
    FaUserPlus,
    FaHandshake,
    FaHeart,
    FaComment,
    FaEnvelope,
    FaCheck
} from "react-icons/fa";

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
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {senderName}
                    </span>{" "}
                    sent you a connection request
                </>
            );

        case "connection_accepted":
            return (
                <>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {senderName}
                    </span>{" "}
                    accepted your connection request
                </>
            );

        case "like":
            return (
                <>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {senderName}
                    </span>{" "}
                    liked your post
                </>
            );

        case "comment":
            return (
                <>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {senderName}
                    </span>{" "}
                    commented on your post
                </>
            );

        case "message":
            return (
                <>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {senderName}
                    </span>{" "}
                    sent you a message
                </>
            );

        default:
            return (
                <>
                    <span className="font-semibold text-slate-900 dark:text-white">
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
            return <FaUserPlus />;

        case "connection_accepted":
            return <FaHandshake />;

        case "like":
            return <FaHeart />;

        case "comment":
            return <FaComment />;

        case "message":
            return <FaEnvelope />;

        default:
            return <FaBell />;
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
                group
                flex
                items-center
                gap-4
                border-b
                border-slate-100
                px-4
                py-4
                transition-colors
                duration-200
                last:border-b-0
                sm:px-5

                ${
                    !notification.isRead
                        ? "bg-blue-50/60 hover:bg-blue-50 dark:bg-blue-950/20 dark:hover:bg-blue-950/30"
                        : "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/70"
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
                            h-12
                            w-12
                            rounded-full
                            border-2
                            border-white
                            bg-slate-100
                            object-cover
                            shadow-sm
                            dark:border-slate-800
                            dark:bg-slate-800
                        "
                    />

                ) : (

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-white
                            bg-gradient-to-br
                            from-blue-500
                            to-indigo-600
                            text-lg
                            font-bold
                            text-white
                            shadow-sm
                            dark:border-slate-800
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
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-white
                        bg-white
                        text-[10px]
                        text-blue-600
                        shadow-sm
                        dark:border-slate-900
                        dark:bg-slate-800
                        dark:text-blue-400
                    "
                >
                    {getNotificationIcon(notification.type)}
                </div>

            </div>


            {/* -------------------------------- */}
            {/* Notification Content */}
            {/* -------------------------------- */}

            <div className="min-w-0 flex-1">

                <p
                    className={`
                        text-sm
                        leading-5
                        ${
                            !notification.isRead
                                ? "text-slate-800 dark:text-slate-200"
                                : "text-slate-600 dark:text-slate-400"
                        }
                    `}
                >
                    {getNotificationMessage(notification)}
                </p>


                {/* Time */}

                <p className="
                    mt-1
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                ">
                    {dayjs(notification.createdAt).fromNow()}
                </p>


                {/* Mark as read */}

                {!notification.isRead && (

                    <button
                        onClick={() =>
                            onMarkAsRead(notification._id)
                        }
                        className="
                            mt-2
                            inline-flex
                            cursor-pointer
                            items-center
                            gap-1.5
                            rounded-lg
                            px-2
                            py-1
                            text-xs
                            font-semibold
                            text-blue-600
                            transition-colors
                            hover:bg-blue-100
                            hover:text-blue-700
                            dark:text-blue-400
                            dark:hover:bg-blue-950/50
                            dark:hover:text-blue-300
                        "
                    >
                        <FaCheck className="text-[9px]" />
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
                        h-14
                        w-14
                        shrink-0
                        rounded-xl
                        border
                        border-slate-200
                        object-cover
                        shadow-sm
                        sm:h-16
                        sm:w-16
                        dark:border-slate-700
                    "
                />

            )}


            {/* -------------------------------- */}
            {/* Unread Indicator */}
            {/* -------------------------------- */}

            {!notification.isRead && (

                <span
                    className="
                        h-2.5
                        w-2.5
                        shrink-0
                        rounded-full
                        bg-blue-600
                        shadow-sm
                        shadow-blue-500/40
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
                px-6
                py-14
                text-center
            "
        >

            <div
                className="
                    mb-4
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-xl
                    text-blue-600
                    dark:bg-blue-950/40
                    dark:text-blue-400
                "
            >
                <FaBell />
            </div>

            <p className="
                text-sm
                font-medium
                text-slate-600
                dark:text-slate-400
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
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
        ">

            {[1, 2, 3, 4].map((item) => (

                <div
                    key={item}
                    className="
                        flex
                        items-center
                        gap-4
                        border-b
                        border-slate-100
                        p-5
                        last:border-b-0
                        dark:border-slate-800
                    "
                >

                    <div
                        className="
                            h-12
                            w-12
                            shrink-0
                            animate-pulse
                            rounded-full
                            bg-slate-200
                            dark:bg-slate-700
                        "
                    />

                    <div className="min-w-0 flex-1">

                        <div
                            className="
                                mb-2
                                h-4
                                w-3/4
                                animate-pulse
                                rounded
                                bg-slate-200
                                dark:bg-slate-700
                            "
                        />

                        <div
                            className="
                                h-3
                                w-20
                                animate-pulse
                                rounded
                                bg-slate-200
                                dark:bg-slate-700
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
                mx-auto
                max-w-3xl
                px-4
                py-6
                sm:px-6
            ">

                <div className="mb-6">

                    <div
                        className="
                            mb-2
                            h-8
                            w-52
                            animate-pulse
                            rounded-lg
                            bg-slate-200
                            dark:bg-slate-700
                        "
                    />

                    <div
                        className="
                            h-4
                            w-72
                            animate-pulse
                            rounded
                            bg-slate-200
                            dark:bg-slate-700
                        "
                    />

                </div>

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
                mx-auto
                max-w-3xl
                px-4
                py-6
                sm:px-6
            ">

                <div className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-5
                    text-sm
                    font-medium
                    text-red-600
                    dark:border-red-900/50
                    dark:bg-red-950/30
                    dark:text-red-400
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
            mx-auto
            max-w-3xl
            px-4
            py-6
            sm:px-6
        ">


            {/* ===================================== */}
            {/* Header */}
            {/* ===================================== */}

            <div className="mb-7">

                <div className="flex items-center gap-3">

                    <div className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-600
                        to-indigo-600
                        text-white
                        shadow-lg
                        shadow-blue-500/20
                    ">
                        <FaBell />
                    </div>

                    <div>

                        <h1 className="
                            text-2xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            dark:text-white
                            sm:text-3xl
                        ">
                            Notifications
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        ">
                            Stay updated with your latest activity
                        </p>

                    </div>

                </div>

            </div>


            {/* ===================================== */}
            {/* UNREAD */}
            {/* ===================================== */}

            <section className="mb-8">

                <div className="
                    mb-3
                    flex
                    items-center
                    gap-2
                ">

                    <h2 className="
                        text-lg
                        font-bold
                        text-slate-900
                        dark:text-white
                    ">
                        Unread
                    </h2>

                    <span className="
                        flex
                        h-6
                        min-w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-100
                        px-2
                        text-xs
                        font-bold
                        text-blue-700
                        dark:bg-blue-950/60
                        dark:text-blue-400
                    ">
                        {unreadNotifications.length}
                    </span>

                </div>


                <div className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition-colors
                    duration-300
                    dark:border-slate-800
                    dark:bg-slate-900
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

                <div className="
                    mb-3
                    flex
                    items-center
                    justify-between
                ">

                    <h2 className="
                        text-lg
                        font-bold
                        text-slate-900
                        dark:text-white
                    ">
                        Earlier
                    </h2>

                    <span className="
                        text-xs
                        font-medium
                        text-slate-400
                        dark:text-slate-500
                    ">
                        {readNotifications.length} notification
                        {readNotifications.length !== 1 ? "s" : ""}
                    </span>

                </div>


                <div className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition-colors
                    duration-300
                    dark:border-slate-800
                    dark:bg-slate-900
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