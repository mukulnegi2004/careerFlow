import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

            // Refresh connections
            dispatch(fetchConnections());

            // Refresh pending requests
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

            // Refresh pending requests
            dispatch(fetchPendingRequests());
        }

    };


    // =========================================================
    // REMOVE CONNECTION
    // =========================================================

    const handleRemoveConnection = async (connectionId) => {

        // connectionId here is:
        // connection._id
        //
        // NOT person._id

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

            // Refresh connections
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

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">


            {/* =================================================
                PENDING REQUESTS
            ================================================= */}

            <section className="bg-white rounded-xl shadow">

                <div className="p-5 border-b">

                    <h2 className="text-xl font-semibold">
                        Pending Requests
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        People who want to connect with you
                    </p>

                </div>


                {pendingRequests.length === 0 ? (

                    <div className="p-8 text-center text-gray-500">

                        No pending connection requests

                    </div>

                ) : (

                    <div className="divide-y">

                        {pendingRequests.map((request) => {

                            const sender =
                                request.sender;


                            return (

                                <div
                                    key={request._id}
                                    className="
                                        p-5
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    "
                                >

                                    {/* =========================
                                        USER INFORMATION
                                    ========================= */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            cursor-pointer
                                        "
                                        onClick={() =>
                                            openProfile(
                                                sender._id
                                            )
                                        }
                                    >

                                        {/* Profile Image / Letter */}

                                        {sender?.profileImage ? (

                                            <img
                                                src={
                                                    sender.profileImage
                                                }
                                                alt={sender.name}
                                                className="
                                                    w-14
                                                    h-14
                                                    rounded-full
                                                    object-cover
                                                    border
                                                "
                                            />

                                        ) : (

                                            <div
                                                className="
                                                    w-14
                                                    h-14
                                                    rounded-full
                                                    bg-gray-200
                                                    border
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xl
                                                    font-semibold
                                                    text-gray-600
                                                "
                                            >
                                                {sender?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() ||
                                                    "U"}
                                            </div>

                                        )}


                                        {/* Name + Headline */}

                                        <div>

                                            <h3 className="font-semibold text-lg">
                                                {sender?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {sender?.headline ||
                                                    "No headline"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* =========================
                                        ACCEPT / REJECT
                                    ========================= */}

                                    <div className="flex gap-2">

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
                                                px-4
                                                py-2
                                                bg-blue-600
                                                text-white
                                                rounded-lg
                                                hover:bg-blue-700
                                                disabled:opacity-50
                                                cursor-pointer
                                            "
                                        >
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
                                                px-4
                                                py-2
                                                border
                                                border-gray-300
                                                text-gray-700
                                                rounded-lg
                                                hover:bg-gray-100
                                                disabled:opacity-50
                                                cursor-pointer
                                            "
                                        >
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

            <section className="bg-white rounded-xl shadow">

                <div className="p-5 border-b">

                    <h2 className="text-xl font-semibold">
                        My Connections
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        People you're connected with
                    </p>

                </div>


                {connections.length === 0 ? (

                    <div className="p-8 text-center text-gray-500">

                        You don't have any connections yet.

                    </div>

                ) : (

                    <div className="divide-y">

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
                                        p-5
                                        flex
                                        items-center
                                        gap-4
                                        hover:bg-gray-50
                                        transition
                                    "
                                >

                                    {/* =========================
                                        USER INFORMATION
                                    ========================= */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            flex-1
                                            cursor-pointer
                                        "
                                        onClick={() =>
                                            openProfile(
                                                person._id
                                            )
                                        }
                                    >

                                        {/* Profile Image */}

                                        {person?.profileImage ? (

                                            <img
                                                src={
                                                    person.profileImage
                                                }
                                                alt={person.name}
                                                className="
                                                    w-16
                                                    h-16
                                                    rounded-full
                                                    object-cover
                                                    border
                                                "
                                            />

                                        ) : (

                                            <div
                                                className="
                                                    w-16
                                                    h-16
                                                    rounded-full
                                                    bg-gray-200
                                                    border
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-2xl
                                                    font-semibold
                                                    text-gray-600
                                                "
                                            >
                                                {person?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() ||
                                                    "U"}
                                            </div>

                                        )}


                                        {/* User Information */}

                                        <div>

                                            <h3 className="text-lg font-semibold">
                                                {person.name}
                                            </h3>

                                            <p className="text-gray-500">
                                                {person.headline ||
                                                    "No headline"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* =========================
                                        CONNECTED STATUS
                                    ========================= */}

                                    <span
                                        className="
                                            hidden
                                            sm:block
                                            text-sm
                                            text-green-600
                                            font-medium
                                        "
                                    >
                                        Connected
                                    </span>


                                    {/* =========================
                                        REMOVE BUTTON
                                    ========================= */}

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
                                            px-4
                                            py-2
                                            bg-red-500
                                            text-white
                                            rounded-lg
                                            hover:bg-red-600
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                            cursor-pointer
                                        "
                                    >

                                        {actionLoading
                                            ? "Removing..."
                                            : "Remove"
                                        }

                                    </button>

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>

        </div>

    );

};


export default Connections;