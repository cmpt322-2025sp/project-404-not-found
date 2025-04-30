import LoginForm from "../components/LoginForm"

const Login = () => {
    localStorage.removeItem('token')
    return(
        <>
            <LoginForm/>
        </>
    )
}

export default Login