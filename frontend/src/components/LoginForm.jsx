import { useState, useEffect } from "react"
import { PROCESSURL } from "../Const"
import { useAuth } from "../functions/AuthProvider"

const LoginForm = () => {
    const [csrf, setCSRF] = useState('');
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
        setFormData(values => ({ ...values, [name]: value }))
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
                if (result.error) {
                    setErrors(({ server_1: result.error }))
                }
            })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(120deg, #ff8c00, #00b3b3)',
            fontFamily: "'Comic Sans MS', 'Arial', sans-serif",
            position: 'fixed',
            top: '0',
            left: '0',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute', width: '180px', height: '180px',
                backgroundColor: '#ff6666', borderRadius: '50%',
                top: '10%', left: '10%', opacity: 0.8,
                animation: 'floatUp 4s infinite alternate ease-in-out'
            }}></div>

            <div style={{
                position: 'absolute', width: '140px', height: '140px',
                backgroundColor: '#66ccff', borderRadius: '50%',
                bottom: '10%', right: '10%', opacity: 0.8,
                animation: 'floatDown 4s infinite alternate ease-in-out'
            }}></div>

            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: '#fff',
                    padding: '40px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    width: '430px',
                    textAlign: 'center',
                    position: 'relative',
                    animation: 'popIn 1s ease-out'
                }}
            >
                <h2 style={{
                    color: '#ff4d4d',
                    fontSize: '28px',
                    marginBottom: '15px',
                    textShadow: '2px 2px 0px #ffcc00',
                    animation: 'bounce 1.5s infinite'
                }}>🎮 Bob's Math Adventure 🚀</h2>

                <h3 style={{
                    fontSize: '18px',
                    color: '#333',
                    marginBottom: '20px',
                    backgroundColor: '#66ccff',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'inline-block'
                }}>Welcome! Enter to Play 🎲</h3>

                {errors.server_1 && (
                    <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>
                        {errors.server_1}
                    </p>
                )}

                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email || ""}
                        onChange={handleChange}
                        style={{
                            width: '85%',
                            padding: '12px',
                            border: '3px solid #66ccff',
                            borderRadius: '12px',
                            fontSize: '16px',
                            backgroundColor: '#e6f7ff',
                            textAlign: 'center',
                            display: 'block',
                            margin: 'auto'
                        }}
                        placeholder="📧 Your Email"
                        autoFocus="autofocus"
                    />
                </div>

                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={formData.password || ""}
                        onChange={handleChange}
                        style={{
                            width: '85%',
                            padding: '12px',
                            border: '3px solid #ffcc00',
                            borderRadius: '12px',
                            fontSize: '16px',
                            backgroundColor: '#fffbe6',
                            textAlign: 'center',
                            display: 'block',
                            margin: 'auto'
                        }}
                        placeholder="🔑 Your Password"
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="🎉 Start Playing!"
                        style={{
                            width: '85%',
                            padding: '12px',
                            border: 'none',
                            backgroundColor: '#ff4d4d',
                            color: '#fff',
                            borderRadius: '12px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            display: 'block',
                            margin: 'auto'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />
                </div>
            </form>

            <style>
                {`
                    @keyframes popIn {
                        0% { transform: scale(0.8); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }

                    @keyframes floatUp {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-20px); }
                    }

                    @keyframes floatDown {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(20px); }
                    }
                `}
            </style>
        </div>
    )
}

export default LoginForm
