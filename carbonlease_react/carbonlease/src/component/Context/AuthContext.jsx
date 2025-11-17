import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navi = useNavigate();

    const [auth, setAuth] = useState({
        memberId : null,
        nickName : null,
        accessToken : null,
        refreshToken : null,
        role : null,
        isAuthenticated : false,
    });

    useEffect(() => {
        const memberId = localStorage.getItem("memberId");
        const nickName = localStorage.getItem("nickName");
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const role = localStorage.getItem("role");

        //console.log(refreshToken);

        {
            accessToken !== null ? 

        axios.post("http://localhost/auth/refresh", {
            refreshToken : refreshToken,
        }, {
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        }
        ).then(result => {
            setAuth({
                memberId,
                nickName,
                accessToken,
                refreshToken,
                role,
                isAuthenticated : true
            });
        }).catch(error => {
            console.log("자동 로그인 실패");
            localStorage.removeItem("memberId");
            localStorage.removeItem("nickName");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("role");
        })
        :
        <></>
    }

    },[]);

    const login = (memberId, nickName, accessToken, refreshToken, role) => {
        setAuth({
            memberId,
            nickName,
            accessToken,
            refreshToken,
            role,
            isAuthenticated : true,
        });

        localStorage.setItem("memberId",memberId);
        localStorage.setItem("nickName",nickName);
        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("refreshToken",refreshToken);
        localStorage.setItem("role",role);
    }

    const logout = () => {
        setAuth({
            memberId : null,
            nickName : null,
            accessToken : null,
            refreshToken : null,
            role : null,
            isAuthenticated : false,
        });

        localStorage.removeItem("memberId");
        localStorage.removeItem("nickName");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");

        navi('/');

    }

    return (
    <AuthContext.Provider value={{auth, login, logout}}>
        {children}
    </AuthContext.Provider>
    )
}

