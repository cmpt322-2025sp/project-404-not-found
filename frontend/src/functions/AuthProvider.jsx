import { useContext, createContext, useState, useEffect } from "react"
import { PROCESSURL } from "../Const"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setAuthentication] = useState(false)
    const navigateUser = useNavigate()

    useEffect(() => {
        fetch(PROCESSURL + 'muffin/isLoggedIn', {method: 'GET', credentials: 'include'})
            .then((res) => res.json())
            .then((data) => {
                setAuthentication(data.value)
                console.log("IS LOGGED IN")
                console.log(data.value)
                console.log(isAuthenticated)
            })
    }, [])

    const login = (data) => {
        return fetch(PROCESSURL + 'login', { 
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((response) => {
                if(response.loggedIn){
                    setAuthentication(true)
                    navigateUser('/game')
                    return true;
                }else{
                    return JSON.stringify(response)
                }
            })
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

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>

}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}