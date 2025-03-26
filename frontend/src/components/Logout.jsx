import { useAuth } from "../functions/AuthProvider"
import { Link } from "react-router-dom"

const Logout = () => {
    const auth = useAuth()
    const { isAdmin } = useAuth()

    return (
        <div style={{ textAlign: 'center' }}>
            <p>Welcome, <span style={{ fontWeight: 'bold', color: '#ff6600' }}>username</span>!</p>
            <button 
                onClick={(e) => { 
                    e.preventDefault()
                    auth.logout()
                }}
                style={{
                    backgroundColor: '#ff6600',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ff9900'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ff6600'}
            >
                Logout
            </button>
            { isAdmin && 
                <Link to="/admin">
                    <button
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            marginLeft: '10px',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                    >
                        Admin
                    </button>
                </Link>
            }
        </div>
    );
};

export default Logout
