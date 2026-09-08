import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    FaUserFriends,
    FaUserPlus,
    FaCheck,
    FaTimes,
    FaTrash,
    FaArrowRight,
} from "react-icons/fa";

import {
    fetchConnections,
    fetchPendingRequests,
    acceptRequest,
    rejectRequest,
    removeConnectionRequest,
} from "../features/connection/connectionAPI";

import {
    selectConnections,
    selectPendingRequests,
    selectConnectionLoading,
    selectConnectionActionLoading,
    selectConnectionError,
} from "../features/connection/connectionSelectors";

import { selectUser } from "../features/auth/authSelectors";

import Loader from "../components/common/Loader";


const Connections = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // =========================================================
    // CURRENT USER
    // =========================================================

    const currentUser = useSelector(selectUser);


    // =========================================================
    // CONNECTION STATE
    // =========================================================

    const connections = useSelector(selectConnections);

    const pendingRequests = useSelector(
        selectPendingRequests
    );

    const loading = useSelector(
        selectConnectionLoading
    );

    const actionLoading = useSelector(
        selectConnectionActionLoading
    );

    const error = useSelector(
        selectConnectionError
    );


    // =========================================================
    // FETCH CONNECTIONS + PENDING REQUESTS
    // =========================================================

    useEffect(() => {

        dispatch(fetchConnections());

        dispatch(fetchPendingRequests());

    }, [dispatch]);


    // =========================================================
    // SHOW ERROR
    // =========================================================

    useEffect(() => {

        if (error) {
            toast.error(error);
        }

    }, [error]);


    // =========================================================
    // ACCEPT REQUEST
    // =========================================================

    const handleAccept = async (requestId) => {

        const result = await dispatch(
            acceptRequest(requestId)
        );

        if (acceptRequest.fulfilled.match(result)) {

            toast.success(
                "Connection accepted"
            );

            dispatch(fetchConnections());

            dispatch(fetchPendingRequests());
        }

    };


    // =========================================================
    // REJECT REQUEST
    // =========================================================

    const handleReject = async (requestId) => {

        const result = await dispatch(
            rejectRequest(requestId)
        );

        if (rejectRequest.fulfilled.match(result)) {

            toast.success(
                "Connection request rejected"
            );

            dispatch(fetchPendingRequests());
        }

    };


    // =========================================================
    // REMOVE CONNECTION
    // =========================================================

    const handleRemoveConnection = async (connectionId) => {

        if (!connectionId) {

            toast.error(
                "Connection ID not found"
            );

            return;
        }


        const result = await dispatch(
            removeConnectionRequest(connectionId)
        );


        if (
            removeConnectionRequest.fulfilled.match(
                result
            )
        ) {

            toast.success(
                "Connection removed"
            );

            dispatch(fetchConnections());

        } else {

            toast.error(
                result.payload ||
                "Failed to remove connection"
            );

        }

    };


    // =========================================================
    // OPEN USER PROFILE
    // =========================================================

    const openProfile = (userId) => {

        navigate(`/users/${userId}`);

    };


    // =========================================================
    // GET OTHER USER
    // =========================================================

    const getOtherUser = (connection) => {

        if (!currentUser) {
            return null;
        }


        if (
            String(connection.sender?._id) ===
            String(currentUser._id)
        ) {

            return connection.receiver;

        }


        return connection.sender;

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return <Loader />;

    }


    return (

        <div className="
            mx-auto
            w-full
            max-w-4xl
            space-y-7
            px-4
            py-6
            sm:px-6
        ">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="flex items-center gap-3">

                <div className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-600
                    text-xl
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                ">
                    <FaUserFriends />
                </div>

                <div>

                    <h1 className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        dark:text-white
                    ">
                        Connections
                    </h1>

                    <p className="
                        mt-0.5
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Manage your professional network
                    </p>

                </div>

            </div>


            {/* =================================================
                PENDING REQUESTS
            ================================================= */}

            <section className="
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

                {/* HEADER */}

                <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    px-5
                    py-5
                    dark:border-slate-800
                    sm:px-6
                ">

                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            dark:bg-blue-950/50
                            dark:text-blue-400
                        ">
                            <FaUserPlus />
                        </div>

                        <div>

                            <h2 className="
                                text-lg
                                font-bold
                                text-slate-900
                                dark:text-white
                            ">
                                Pending Requests
                            </h2>

                            <p className="
                                mt-0.5
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            ">
                                People who want to connect with you
                            </p>

                        </div>

                    </div>


                    {/* REQUEST COUNT */}

                    {pendingRequests.length > 0 && (

                        <span className="
                            flex
                            h-8
                            min-w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-600
                            px-2
                            text-xs
                            font-bold
                            text-white
                        ">
                            {pendingRequests.length}
                        </span>

                    )}

                </div>


                {/* EMPTY STATE */}

                {pendingRequests.length === 0 ? (

                    <div className="
                        px-6
                        py-12
                        text-center
                    ">

                        <div className="
                            mx-auto
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-100
                            text-xl
                            text-slate-400
                            dark:bg-slate-800
                            dark:text-slate-500
                        ">
                            <FaUserPlus />
                        </div>

                        <h3 className="
                            font-semibold
                            text-slate-800
                            dark:text-white
                        ">
                            No pending requests
                        </h3>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        ">
                            You don't have any new connection requests.
                        </p>

                    </div>

                ) : (

                    <div>

                        {pendingRequests.map((request) => {

                            const sender = request.sender;


                            return (

                                <div
                                    key={request._id}
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        border-b
                                        border-slate-100
                                        p-5
                                        last:border-b-0
                                        dark:border-slate-800
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                        sm:px-6
                                    "
                                >

                                    {/* USER INFORMATION */}

                                    <div
                                        className="
                                            flex
                                            min-w-0
                                            flex-1
                                            cursor-pointer
                                            items-center
                                            gap-4
                                        "
                                        onClick={() =>
                                            openProfile(sender._id)
                                        }
                                    >

                                        {sender?.profileImage ? (

                                            <img
                                                src={
                                                    sender.profileImage
                                                }
                                                alt={sender.name}
                                                className="
                                                    h-14
                                                    w-14
                                                    shrink-0
                                                    rounded-full
                                                    border-2
                                                    border-slate-100
                                                    object-cover
                                                    shadow-sm
                                                    dark:border-slate-700
                                                "
                                            />

                                        ) : (

                                            <div className="
                                                flex
                                                h-14
                                                w-14
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-gradient-to-br
                                                from-blue-500
                                                to-indigo-600
                                                text-xl
                                                font-bold
                                                text-white
                                                shadow-md
                                            ">
                                                {sender?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() ||
                                                    "U"}
                                            </div>

                                        )}


                                        <div className="min-w-0">

                                            <h3 className="
                                                truncate
                                                font-semibold
                                                text-slate-900
                                                transition-colors
                                                duration-200
                                                hover:text-blue-600
                                                dark:text-white
                                                dark:hover:text-blue-400
                                            ">
                                                {sender?.name}
                                            </h3>

                                            <p className="
                                                mt-1
                                                truncate
                                                text-sm
                                                text-slate-500
                                                dark:text-slate-400
                                            ">
                                                {sender?.headline ||
                                                    "No headline"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* ACCEPT / REJECT */}

                                    <div className="
                                        flex
                                        w-full
                                        gap-2
                                        sm:w-auto
                                    ">

                                        <button
                                            onClick={() =>
                                                handleAccept(
                                                    request._id
                                                )
                                            }
                                            disabled={
                                                actionLoading
                                            }
                                            className="
                                                flex
                                                flex-1
                                                items-center
                                                justify-center
                                                cursor-pointer
                                                gap-2
                                                rounded-xl
                                                bg-gradient-to-r
                                                from-blue-600
                                                to-indigo-600
                                                px-4
                                                py-2.5
                                                text-sm
                                                font-semibold
                                                text-white
                                                shadow-md
                                                shadow-blue-500/20
                                                transition-all
                                                duration-200
                                                hover:-translate-y-0.5
                                                hover:shadow-lg
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                                sm:flex-none
                                            "
                                        >
                                            <FaCheck />
                                            Accept
                                        </button>


                                        <button
                                            onClick={() =>
                                                handleReject(
                                                    request._id
                                                )
                                            }
                                            disabled={
                                                actionLoading
                                            }
                                            className="
                                                flex
                                                flex-1
                                                items-center
                                                justify-center
                                                cursor-pointer
                                                gap-2
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                px-4
                                                py-2.5
                                                text-sm
                                                font-semibold
                                                text-slate-600
                                                transition-all
                                                duration-200
                                                hover:bg-slate-50
                                                hover:text-red-600
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                                dark:border-slate-700
                                                dark:bg-slate-800
                                                dark:text-slate-300
                                                dark:hover:bg-slate-700
                                                dark:hover:text-red-400
                                                sm:flex-none
                                            "
                                        >
                                            <FaTimes />
                                            Reject
                                        </button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>


            {/* =================================================
                ALL CONNECTIONS
            ================================================= */}

            <section className="
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

                {/* HEADER */}

                <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    px-5
                    py-5
                    dark:border-slate-800
                    sm:px-6
                ">

                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-indigo-50
                            text-indigo-600
                            dark:bg-indigo-950/50
                            dark:text-indigo-400
                        ">
                            <FaUserFriends />
                        </div>

                        <div>

                            <h2 className="
                                text-lg
                                font-bold
                                text-slate-900
                                dark:text-white
                            ">
                                My Connections
                            </h2>

                            <p className="
                                mt-0.5
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            ">
                                People you're connected with
                            </p>

                        </div>

                    </div>


                    {connections.length > 0 && (

                        <span className="
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-slate-600
                            dark:bg-slate-800
                            dark:text-slate-300
                        ">
                            {connections.length}
                        </span>

                    )}

                </div>


                {/* EMPTY STATE */}

                {connections.length === 0 ? (

                    <div className="
                        px-6
                        py-12
                        text-center
                    ">

                        <div className="
                            mx-auto
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-indigo-50
                            text-xl
                            text-indigo-500
                            dark:bg-indigo-950/40
                            dark:text-indigo-400
                        ">
                            <FaUserFriends />
                        </div>

                        <h3 className="
                            font-semibold
                            text-slate-800
                            dark:text-white
                        ">
                            No connections yet
                        </h3>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        ">
                            Start connecting with people to grow your network.
                        </p>

                    </div>

                ) : (

                    <div>

                        {connections.map((connection) => {

                            const person =
                                getOtherUser(connection);


                            if (!person) {
                                return null;
                            }


                            return (

                                <div
                                    key={connection._id}
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        border-b
                                        border-slate-100
                                        p-5
                                        last:border-b-0
                                        transition-colors
                                        duration-200
                                        hover:bg-slate-50
                                        dark:border-slate-800
                                        dark:hover:bg-slate-800/50
                                        sm:px-6
                                    "
                                >

                                    {/* USER INFORMATION */}

                                    <div
                                        className="
                                            flex
                                            min-w-0
                                            flex-1
                                            cursor-pointer
                                            items-center
                                            gap-4
                                        "
                                        onClick={() =>
                                            openProfile(
                                                person._id
                                            )
                                        }
                                    >

                                        {person?.profileImage ? (

                                            <img
                                                src={
                                                    person.profileImage
                                                }
                                                alt={person.name}
                                                className="
                                                    h-14
                                                    w-14
                                                    shrink-0
                                                    rounded-full
                                                    border-2
                                                    border-slate-100
                                                    object-cover
                                                    shadow-sm
                                                    dark:border-slate-700
                                                "
                                            />

                                        ) : (

                                            <div className="
                                                flex
                                                h-14
                                                w-14
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-gradient-to-br
                                                from-indigo-500
                                                to-violet-600
                                                text-xl
                                                font-bold
                                                text-white
                                                shadow-md
                                            ">
                                                {person?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() ||
                                                    "U"}
                                            </div>

                                        )}


                                        {/* USER INFO */}

                                        <div className="min-w-0">

                                            <h3 className="
                                                truncate
                                                font-semibold
                                                text-slate-900
                                                transition-colors
                                                duration-200
                                                hover:text-blue-600
                                                dark:text-white
                                                dark:hover:text-blue-400
                                            ">
                                                {person.name}
                                            </h3>

                                            <p className="
                                                mt-1
                                                truncate
                                                text-sm
                                                text-slate-500
                                                dark:text-slate-400
                                            ">
                                                {person.headline ||
                                                    "No headline"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* CONNECTED STATUS */}

                                    <span className="
                                        hidden
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        bg-emerald-50
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-semibold
                                        text-emerald-600
                                        dark:bg-emerald-950/40
                                        dark:text-emerald-400
                                        sm:flex
                                    ">
                                        <FaCheck className="text-[10px]" />
                                        Connected
                                    </span>


                                    {/* REMOVE */}

                                    <button
                                        onClick={() =>
                                            handleRemoveConnection(
                                                connection._id
                                            )
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="
                                            cursor-pointer
                                            flex
                                            shrink-0
                                            items-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-red-100
                                            bg-red-50
                                            px-3
                                            py-2
                                            text-sm
                                            font-semibold
                                            text-red-600
                                            transition-all
                                            duration-200
                                            hover:-translate-y-0.5
                                            hover:bg-red-100
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                            dark:border-red-900/50
                                            dark:bg-red-950/30
                                            dark:text-red-400
                                            dark:hover:bg-red-950/50
                                            sm:px-4
                                        "
                                    >

                                        <FaTrash className="text-xs" />

                                        <span className="hidden sm:inline">
                                            {actionLoading
                                                ? "Removing..."
                                                : "Remove"}
                                        </span>

                                    </button>

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>


            {/* =================================================
                NETWORK FOOTER
            ================================================= */}

            {(connections.length > 0 ||
                pendingRequests.length > 0) && (

                <div className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-2
                    text-xs
                    font-medium
                    text-slate-400
                    dark:text-slate-500
                ">

                    <FaUserFriends />

                    <span>
                        Keep growing your professional network
                    </span>

                    <FaArrowRight />

                </div>

            )}

        </div>

    );

};


export default Connections;