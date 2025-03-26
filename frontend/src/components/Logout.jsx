import { useAuth } from "../functions/AuthProvider"

const Logout = () => {
    const auth = useAuth()

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
        </div>
    );
};

export default Logout
