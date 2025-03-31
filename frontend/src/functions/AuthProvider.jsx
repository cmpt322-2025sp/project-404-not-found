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
        fetch(PROCESSURL + 'muffin/isAdmin', {method: 'GET', credentials: 'include'})
            .then((res) => res.json())
            .then((data) => {
                setAdmin(data.value)
            })
        fetch(PROCESSURL + 'muffin/userId', {method: 'GET', credentials: 'include'})
            .then((res) => res.json())
            .then((data) => {
                setUserId(data.value)
            })
        fetch(PROCESSURL + 'muffin/userFirstName', {method: 'GET', credentials: 'include'})
            .then((res) => res.json())
            .then((data) => {
                setUserFirstName(data.value)
            })
        fetch(PROCESSURL + 'muffin/isLoggedIn', {method: 'GET', credentials: 'include'})
            .then((res) => res.json())
            .then((data) => {
                setAuthentication(data.value)
            })
    }, [])

    const login = async (data) => {
        try {
            const res = await fetch(PROCESSURL + 'login', { 
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    csrf: data.csrf
                },
                body: JSON.stringify(data)
            });
            
            const response = await res.json();
    
            if (response.loggedIn) {
                setAdmin(response.adminLoggedIn)
                setAuthentication(true)
                setUserId(response.userId)
                setUserFirstName(response.userFirstName)
                response.adminLoggedIn ? navigateUser('/admin') : navigateUser('/game')
                return true
            } else {
                return JSON.stringify(response)
            }
        } catch (error) {
            return false
        }
    }
    

    const logout = () => {
        fetch(PROCESSURL + 'logout', { 
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then(() => {
                setAuthentication(false);
                navigateUser('/');
            })
    }

    return <AuthContext.Provider value={{ isAuthenticated, isAdmin, userId, userFirstName, login, logout }}>{children}</AuthContext.Provider>

}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}