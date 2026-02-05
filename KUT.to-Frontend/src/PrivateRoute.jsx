import { Navigate } from "react-router-dom";
import { useStoreContext } from "./api/ContextApi";

export default function PrivateRoute({ children, publicPage}) {
    const { token } = useStoreContext();

    if (publicPage) {
        return token ? <Navigate to="/" /> : children;
    }

    return !token ? <Navigate to="/login" /> : children;
}