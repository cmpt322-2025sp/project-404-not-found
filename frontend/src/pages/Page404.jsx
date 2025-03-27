const Page404 = () => {
    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                backgroundColor: '#fff', 
                padding: '30px', 
                borderRadius: '8px', 
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
                textAlign: 'center', 
                width: '100%', 
                maxWidth: '400px'
            }}>
                <h1 style={{
                    fontSize: '48px', 
                    fontWeight: 'bold', 
                    marginBottom: '20px'
                }}>
                    404
                </h1>
                <h4 style={{
                    fontSize: '24px', 
                    marginBottom: '15px'
                }}>
                    Not Found
                </h4>
                <h5 style={{
                    fontSize: '16px', 
                    marginBottom: '25px'
                }}>
                    The page you are looking for is not available.
                </h5>
                <div style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '15px'
                }}>
                    <button 
                        onClick={() => window.location.reload()} 
                        style={{
                            padding: '10px 20px', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px', 
                            fontSize: '16px', 
                            cursor: 'pointer'
                        }}
                    >
                        Refresh Page
                    </button>
                    <button 
                        onClick={() => window.history.back()} 
                        style={{
                            padding: '10px 20px', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px', 
                            fontSize: '16px', 
                            cursor: 'pointer'
                        }}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page404