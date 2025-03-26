import { useState, useEffect } from "react"
import { PROCESSURL } from "../Const"
import { useAuth } from "../functions/AuthProvider"

const LoginForm = () => {
    const[csrf, setCSRF] = useState('');
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const auth = useAuth();

    useEffect(() => {
        fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((response) => {
                setCSRF(response.csrf);
            })
            .catch((err) => {
                alert(err.error);
            })
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formData['csrf'] = csrf;
        let tempPassword = formData.password;
        formData.password = '';
        formData['h_password'] = tempPassword;
        auth.login(formData)
            .then((result) => {
                result = JSON.parse(result);
                if(result.error){
                    setErrors(({server_1: result.error}))
                }
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            { errors ? <p style={{color:'red'}}>{JSON.stringify(errors)}</p> : ''}
            <label htmlFor="email">Email</label>
            <input 
                type="email"
                name="email"
                id="email"
                required="required"
                value={formData.email || ""}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password"
                name="password"
                id="password"
                required="required"
                value={formData.password || ""}
                onChange={handleChange}
            />
            <input type="submit" value="Login"/>
        </form>
    )
}

export default LoginForm