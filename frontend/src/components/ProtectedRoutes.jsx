import { Outlet } from "react-router-dom";
import { useAuth } from "../functions/AuthProvider";
import Page403 from "../pages/Page403";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Outlet /> : <Outlet />
};

export default ProtectedRoutes