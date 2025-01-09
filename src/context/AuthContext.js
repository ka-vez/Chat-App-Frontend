import {createContext, useState, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import {useHistory} from "react-router-dom";

const swal = require('sweetalert2')
const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const[authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    )

    const[user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
        ? jwtDecode(localStorage.getItem("authTokens"))
        : null
    )

    const[loading, setLoading] = useState(true)

    const history = useHistory()

    const loginUser = async (email, password) => {
        const response = await fetch("kavez-chat-b.onrender.com/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })

        })
        const data = await response.json()
        console.log(data)

        if(response.status === 200){
            console.log("Logged In");
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            history.push("/")
            swal.fire({ 
                title: "Login Successful", 
                icon: "success", 
                toast: true, 
                timer: 6000, 
                position: 'top-right', 
                timerProgressBar: true, 
                showConfirmButton: false, 
            })
        }else {
            console.log(response.status);
            console.log("There was a server issue");
            swal.fire({ 
                title: "Username or Password does not exist" , 
                icon: "error", 
                toast: true, 
                timer: 6000, 
                position: 'top-right', 
                timerProgressBar: true, 
                showConfirmButton: false, 
            })
        }
    }

    const registerUser = async(email, username, password, password2) =>{
        const response = await fetch("kavez-chat-b.onrender.com/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })

        if(response.status === 201){
            history.push("/login")
            swal.fire({ 
                title: "Registration Successful, Login Now", 
                icon: "success", 
                toast: true, 
                timer: 6000, 
                position: 'top-right', 
                timerProgressBar: true, 
                showConfirmButton: false, 
            })
        }else {
            console.log(response.status);
            console.log("There was a server issue");
            swal.fire({ 
                title: "An Error occured " + response.status, 
                icon: "error", 
                toast: true, 
                timer: 6000, 
                position: 'top-right', 
                timerProgressBar: true, 
                showConfirmButton: false, 
            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        history.push("/login")
        swal.fire({ 
            title: "You have been logged out...", 
            icon: "success", 
            toast: true, 
            timer: 6000, 
            position: 'top-right', 
            timerProgressBar: true, 
            showConfirmButton: false, 
        })
    }

    const ContextData  = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens){
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={ContextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}