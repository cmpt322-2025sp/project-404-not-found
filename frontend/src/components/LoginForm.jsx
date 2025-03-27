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
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#f4f7fc',
            fontFamily: 'Arial, sans-serif'
        }}>
            <form 
                onSubmit={handleSubmit} 
                style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h2 style={{ color: '#007bff', fontSize: '24px', marginBottom: '20px' }}>Bob's Math Adventure</h2>
                <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '15px' }}>Welcome! Please log in below.</h3>

                {errors.server_1 && (
                    <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>
                        {errors.server_1}
                    </p>
                )}
                
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ fontSize: '14px', color: '#333', display: 'block', marginBottom: '5px' }}>Email</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        required="required"
                        value={formData.email || ""}
                        onChange={handleChange}
                        style={{
                            width: '100%', 
                            padding: '10px', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px', 
                            fontSize: '16px'
                        }}
                        placeholder="bob@westminsterelementary.edu"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ fontSize: '14px', color: '#333', display: 'block', marginBottom: '5px' }}>Password</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        required="required"
                        value={formData.password || ""}
                        onChange={handleChange}
                        style={{
                            width: '100%', 
                            padding: '10px', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px', 
                            fontSize: '16px'
                        }}
                        placeholder="**********"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <input 
                        type="submit" 
                        value="Login" 
                        style={{
                            width: '100%', 
                            padding: '10px', 
                            border: 'none', 
                            backgroundColor: '#007bff', 
                            color: '#fff', 
                            borderRadius: '4px', 
                            fontSize: '16px', 
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default LoginForm
