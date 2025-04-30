import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "../functions/AuthProvider"
import ExpressServicesProvider from "../functions/ExpressServicesProvider";
import ProtectedRoutes from "../components/ProtectedRoutes"
import ProtectedAdminRoutes from "../components/ProtectedAdminRoutes"
import Layout from "../components/Layout"
import Page404 from "./Page404"

import Game from "./Game"
import Preview from "./Preview"
import Assignments from "./Assignments"
import Login from "./Login"
import Admin from "./Admin"

const Router = () => {
    return(
        <BrowserRouter>
            <AuthProvider>
                <ExpressServicesProvider>
                    <Routes>
                        <Route path="/" element={ <Layout /> }>
                            <Route index element={ <Login /> }/>
                            <Route element={<ProtectedRoutes />}>
                                <Route path="/game" element={<Game />} />
                                <Route path="/assignments" element={<Assignments />} />
                            </Route>
                            <Route element={<ProtectedAdminRoutes />}>
                                <Route path="/admin/*" element={<Admin />} />
                            </Route>
                            <Route path="/preview" element={<Preview />} />
                            <Route path="*" element={ <Page404/> }/>
                        </Route>
                    </Routes>
                </ExpressServicesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Router