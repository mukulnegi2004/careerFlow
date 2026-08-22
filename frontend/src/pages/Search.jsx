import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAllUsers, fetchSearchUsers } from "../features/user/userAPI";

import {
    selectUsers, selectUsersPage, selectUsersLoading, selectHasMoreUsers, selectSearchResults,
    selectSearchPage, selectSearchLoading, selectHasMoreSearchResults, selectUserError
} from "../features/user/userSelectors";

import Loader from "../components/common/Loader";
import Error from "../components/common/Error";


function Search() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const LIMIT = 10;

    // ALL USERS
    const users = useSelector(selectUsers);
    const usersPage = useSelector(selectUsersPage);
    const usersLoading = useSelector(selectUsersLoading);
    const hasMoreUsers = useSelector(selectHasMoreUsers);


    // SEARCH RESULTS
    const searchResults = useSelector(selectSearchResults);
    const searchPage = useSelector(selectSearchPage);
    const searchLoading = useSelector(selectSearchLoading);
    const hasMoreSearchResults = useSelector(selectHasMoreSearchResults);


    const error = useSelector(selectUserError);

    // INITIAL / EMPTY SEARCH
    useEffect(() => {
        if (search.trim()) return;

        dispatch(
            fetchAllUsers({
                page: 1,
                limit: LIMIT
            })
        );

    }, [dispatch, search]);


    // SEARCH
    useEffect(() => {
        const query = search.trim();

        if (!query) return;

        const timer = setTimeout(() => {
            dispatch(
                fetchSearchUsers({
                    q: query,
                    page: 1,
                    limit: LIMIT
                })
            );
        }, 400);

        return () => clearTimeout(timer);

    }, [dispatch, search]);



    // PAGINATION
    useEffect(() => {
        const handleScroll = () => {
            if (search.trim()) {

                // SEARCH PAGINATION
                if (searchLoading) return;
                if (!hasMoreSearchResults) return;

                const scrollPosition = window.innerHeight + window.scrollY;

                const pageHeight = document.documentElement.scrollHeight;

                if (scrollPosition >= pageHeight - 100) {
                    dispatch(
                        fetchSearchUsers({
                            q: search.trim(),
                            page: searchPage + 1,
                            limit: LIMIT
                        })
                    );
                }

            } else {

                // ALL USERS PAGINATION
                if (usersLoading) return;
                if (!hasMoreUsers) return;

                const scrollPosition = window.innerHeight + window.scrollY;

                const pageHeight = document.documentElement.scrollHeight;

                if (scrollPosition >= pageHeight - 100) {
                    dispatch(
                        fetchAllUsers({
                            page: usersPage + 1,
                            limit: LIMIT
                        })
                    );
                }
            }
        };


        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [dispatch, search,
        usersPage, usersLoading, hasMoreUsers,
        searchPage, searchLoading, hasMoreSearchResults
    ]);


    // DISPLAY DATA
    const isSearching = search.trim().length > 0;

    const displayedUsers = isSearching ? searchResults : users;

    const loading = isSearching ? searchLoading : usersLoading;

    const hasMore = isSearching ? hasMoreSearchResults : hasMoreUsers;

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">

            {/* ================= SEARCH BOX ================= */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Search
                </h1>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            {/* ================= ERROR ================= */}
            {error && (
                <div className="mt-4">
                    <Error message={error} />
                </div>
            )}


            {/* ================= USERS ================= */}
            <div className="mt-4 space-y-3">
                {displayedUsers.map((user) => (
                    <Link
                        key={user._id}
                        to={`/users/${user._id}`}
                        className="block bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition"
                    >

                        <div className="flex items-center gap-4">
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
                                    className="w-14 h-14 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-gray-200 border flex items-center justify-center text-xl font-semibold text-gray-600">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="min-w-0">
                                <h2 className="font-semibold text-gray-800">{user.name}</h2>
                                <p className="text-sm text-gray-500 truncate">{user.headline || "No headline"}</p>
                            </div>
                        </div>

                    </Link>

                ))}

            </div>


            {/* ================= NO USERS ================= */}
            {!loading && displayedUsers.length === 0 && !error && (
                <div className="bg-white rounded-xl border border-gray-100 p-10 text-center mt-4">
                    <div className="text-4xl mb-3">🔎</div>

                    <h3 className="text-lg font-semibold text-gray-700"> {isSearching ? "No users found" : "No users available"}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {isSearching ? `No users found for "${search}"` : "There are no users to display."}
                    </p>
                </div>
            )}


            {/* ================= LOADING ================= */}
            {loading && (
                <div className="py-5">
                    <Loader />
                </div>
            )}


            {/* ================= END ================= */}
            {!loading && !hasMore && displayedUsers.length > 0 && (
                <div className="text-center py-6 text-sm text-gray-500">
                    {isSearching ? "You've reached the end of search results." : "You've reached the end of users."}
                </div>
            )}
        </div>
    );
}


export default Search;