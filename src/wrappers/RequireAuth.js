import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RequireAuth = ( { children }) => {
    const { token } = useSelector((state) => state.auth);
    if(token) {
        return children;
    }
    return <Navigate to="/login" replace />;
}