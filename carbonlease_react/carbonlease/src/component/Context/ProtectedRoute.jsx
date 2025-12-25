import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allow }) => {
    const { auth } = useContext(AuthContext);

    // 로그인 안됨
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 허용되지 않은 role
    if (Array.isArray(allow) && !allow.includes(auth.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;