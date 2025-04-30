import { useContext, createContext, useState, useEffect } from "react"
import { PROCESSURL } from "../Const"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setAuthentication] = useState(false)
    const [isAdmin, setAdmin] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userFirstName, setUserFirstName] = useState(null)
    const navigateUser = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            fetch(PROCESSURL + 'muffin/all', {method: 'GET', credentials: 'include', headers: {'Authorization': `Bearer ${token}`}})
                .then((res) => res.json())
                .then((data) => {
                    setUserId(data.value.userId)
                    setAuthentication(data.value.isLoggedIn)
                    setAdmin(data.value.isAdmin)
                    setUserFirstName(data.value.userFirstName)
                })
        }
    }, [])

    const login = async (data) => {
        try {
            const res = await fetch(PROCESSURL + 'login', { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const response = await res.json();
    
            if (response.loggedIn) {
                localStorage.setItem('token', response.token);
                setAdmin(response.adminLoggedIn)
                setAuthentication(true)
                setUserId(response.userId)
                setUserFirstName(response.userFirstName)
                response.adminLoggedIn ? navigateUser('/admin/') : navigateUser('/assignments/')
                return true
            } else {
                return JSON.stringify(response)
            }
        } catch (error) {
            return false
        }
    }
    

    const logout = () => {
        localStorage.removeItem('token')
        setAuthentication(false);
        setAdmin(false);
        setUserId(null);
        setUserFirstName(null);
        navigateUser('/');
    }

    return <AuthContext.Provider value={{ isAuthenticated, isAdmin, userId, userFirstName, login, logout }}>{children}</AuthContext.Provider>

}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}