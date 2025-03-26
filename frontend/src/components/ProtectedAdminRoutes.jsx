import { Outlet } from "react-router-dom";
import { useAuth } from "../functions/AuthProvider";
import Page403 from "../pages/Page403";

const ProtectedAdminRoutes = () => {
    const { isAdmin } = useAuth()
    return isAdmin ? <Outlet /> : <Page403 />
};

export default ProtectedAdminRoutes