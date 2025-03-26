import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigateUser = useNavigate()

    return(
        <>
            <LoginForm/>
        </>
    )
}

export default Login