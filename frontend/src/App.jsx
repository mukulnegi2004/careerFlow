import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { fetchCurrentUser } from "./features/auth/authAPI";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("APP useEffect");
        dispatch(fetchCurrentUser());          // restore user's login session, Check for existing login session on app load: logged-in user → restore user; not logged in → null.
    }, []);

    return <AppRoutes />;
}

export default App;