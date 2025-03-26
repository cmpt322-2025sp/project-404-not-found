import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../functions/AuthProvider";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Outlet /> : null
};

export default ProtectedRoutes