import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../components/Layout"
import Game from "./Game"
import Login from "./Login"
import AuthProvider from "../functions/AuthProvider"
import ProtectedRoutes from "../components/ProtectedRoutes"

const Router = () => {
    return(
        <BrowserRouter>
            <AuthProvider>
            <Routes>
                <Route path="/" element={ <Layout/> }>
                    <Route index element={ <Login/> }/>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/game" element={<Game />} />
                    </Route>
                    {/* <Route path="*" element={ <Page404/> }/> */}
                </Route>
            </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Router