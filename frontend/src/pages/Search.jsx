import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch, FaUsers, FaArrowRight } from "react-icons/fa";

import { fetchAllUsers, fetchSearchUsers } from "../features/user/userAPI";

import {
    selectUsers,
    selectUsersPage,
    selectUsersLoading,
    selectHasMoreUsers,
    selectSearchResults,
    selectSearchPage,
    selectSearchLoading,
    selectHasMoreSearchResults,
    selectUserError,
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
                limit: LIMIT,
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
                    limit: LIMIT,
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

                const scrollPosition =
                    window.innerHeight + window.scrollY;

                const pageHeight =
                    document.documentElement.scrollHeight;

                if (scrollPosition >= pageHeight - 100) {
                    dispatch(
                        fetchSearchUsers({
                            q: search.trim(),
                            page: searchPage + 1,
                            limit: LIMIT,
                        })
                    );
                }

            } else {

                // ALL USERS PAGINATION
                if (usersLoading) return;
                if (!hasMoreUsers) return;

                const scrollPosition =
                    window.innerHeight + window.scrollY;

                const pageHeight =
                    document.documentElement.scrollHeight;

                if (scrollPosition >= pageHeight - 100) {
                    dispatch(
                        fetchAllUsers({
                            page: usersPage + 1,
                            limit: LIMIT,
                        })
                    );
                }
            }
        };


        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [
        dispatch,
        search,
        usersPage,
        usersLoading,
        hasMoreUsers,
        searchPage,
        searchLoading,
        hasMoreSearchResults,
    ]);


    // DISPLAY DATA
    const isSearching = search.trim().length > 0;

    const displayedUsers = isSearching
        ? searchResults
        : users;

    const loading = isSearching
        ? searchLoading
        : usersLoading;

    const hasMore = isSearching
        ? hasMoreSearchResults
        : hasMoreUsers;


    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">

            {/* ================= HEADER ================= */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg text-white shadow-lg shadow-blue-500/20">
                        <FaSearch />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Search
                        </h1>

                        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                            Find people and grow your professional network
                        </p>
                    </div>
                </div>
            </div>


            {/* ================= SEARCH BOX ================= */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6">

                <label
                    htmlFor="user-search"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                    Search users
                </label>

                <div className="relative">
                    <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                    <input
                        id="user-search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or headline..."
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            py-3.5
                            pl-11
                            pr-4
                            text-sm
                            text-slate-900
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-slate-400
                            focus:border-blue-500
                            focus:bg-white
                            focus:ring-4
                            focus:ring-blue-500/10
                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-white
                            dark:placeholder:text-slate-500
                            dark:focus:border-blue-500
                            dark:focus:bg-slate-800
                        "
                    />
                </div>

                {isSearching && (
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        Showing results for{" "}
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            "{search.trim()}"
                        </span>
                    </p>
                )}
            </div>


            {/* ================= ERROR ================= */}
            {error && (
                <div className="mt-5">
                    <Error message={error} />
                </div>
            )}


            {/* ================= SECTION HEADER ================= */}
            {!error && (
                <div className="mt-7 mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaUsers className="text-sm text-blue-600 dark:text-blue-400" />

                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                            {isSearching
                                ? "Search Results"
                                : "People You Can Find"}
                        </h2>
                    </div>

                    {displayedUsers.length > 0 && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            {displayedUsers.length}
                        </span>
                    )}
                </div>
            )}


            {/* ================= USERS ================= */}
            <div className="space-y-3">

                {displayedUsers.map((user) => (
                    <Link
                        key={user._id}
                        to={`/users/${user._id}`}
                        className="
                            group
                            block
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-4
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-blue-200
                            hover:shadow-lg
                            hover:shadow-slate-200/50
                            dark:border-slate-800
                            dark:bg-slate-900
                            dark:hover:border-blue-900
                            dark:hover:shadow-black/20
                        "
                    >

                        <div className="flex items-center gap-4">

                            {/* PROFILE IMAGE */}
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
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
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}


                            {/* USER INFO */}
                            <div className="min-w-0 flex-1">
                                <h2 className="
                                    truncate
                                    font-semibold
                                    text-slate-900
                                    transition-colors
                                    duration-200
                                    group-hover:text-blue-600
                                    dark:text-white
                                    dark:group-hover:text-blue-400
                                ">
                                    {user.name}
                                </h2>

                                <p className="
                                    mt-1
                                    truncate
                                    text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                ">
                                    {user.headline || "No headline"}
                                </p>
                            </div>


                            {/* ARROW */}
                            <div className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-slate-50
                                text-slate-400
                                transition-all
                                duration-300
                                group-hover:bg-blue-50
                                group-hover:text-blue-600
                                dark:bg-slate-800
                                dark:text-slate-500
                                dark:group-hover:bg-blue-950/50
                                dark:group-hover:text-blue-400
                            ">
                                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                            </div>

                        </div>

                    </Link>
                ))}

            </div>


            {/* ================= NO USERS ================= */}
            {!loading &&
                displayedUsers.length === 0 &&
                !error && (

                    <div className="
                        mt-4
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-10
                        text-center
                        shadow-sm
                        dark:border-slate-800
                        dark:bg-slate-900
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
                            bg-blue-50
                            text-xl
                            text-blue-600
                            dark:bg-blue-950/50
                            dark:text-blue-400
                        ">
                            <FaSearch />
                        </div>

                        <h3 className="
                            text-lg
                            font-bold
                            text-slate-800
                            dark:text-white
                        ">
                            {isSearching
                                ? "No users found"
                                : "No users available"}
                        </h3>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        ">
                            {isSearching
                                ? `No users found for "${search}"`
                                : "There are no users to display."}
                        </p>

                    </div>
                )}


            {/* ================= LOADING ================= */}
            {loading && (
                <div className="flex justify-center py-7">
                    <Loader />
                </div>
            )}


            {/* ================= END ================= */}
            {!loading &&
                !hasMore &&
                displayedUsers.length > 0 && (

                    <div className="flex items-center gap-4 py-8">

                        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                        <span className="
                            shrink-0
                            text-xs
                            font-medium
                            uppercase
                            tracking-wider
                            text-slate-400
                            dark:text-slate-500
                        ">
                            {isSearching
                                ? "End of search results"
                                : "End of users"}
                        </span>

                        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                    </div>
                )}

        </div>
    );
}


export default Search;