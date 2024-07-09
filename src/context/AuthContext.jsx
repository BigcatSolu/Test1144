import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { clearToken } from "../utils/auth";


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        const res = await axios.post("/api/auth/login", inputs)
        setCurrentUser(res.data)
    }

    const logout = async () => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout it!"
          }).then(async (result) => {
            if (result.isConfirmed) {

                await axios.post("/api/auth/logout")
                setCurrentUser(null)
                clearToken()
                localStorage.clear();


              Swal.fire({
                title: "Logout!",
                text: "You has been logout.",
                icon: "success",
                timer: 1500
              });
            }
          });
    }

    const forceLogout = async () => {
        const res = await axios.post("/api/auth/logout")
        setCurrentUser(null)
        clearToken();
        localStorage.clear();
    }

    const changePassword = async (inputs) => {
        const res = await axios.post('api/auth/changepassword', inputs)
    }
 
    const refreshUserData = async () => {
        if (currentUser && currentUser.user_id) {
            try {
                const res = await axios.get(`/api/users/${currentUser.user_id}`);
                setCurrentUser(res.data[0]);
            } catch (error) {
                console.error("Failed to refresh user data", error);
            }
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, refreshUserData, changePassword, forceLogout}} >
            {children}
        </AuthContext.Provider>
    )
}