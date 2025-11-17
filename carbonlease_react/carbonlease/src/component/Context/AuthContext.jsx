import { createContext, useState } from "react";
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

