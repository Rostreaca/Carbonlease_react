import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth/refresh`
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navi = useNavigate();

    const [kakaoInfo, setKakaoInfo] = useState({
        memberId : null,
        memberPwd : null
    });

    const [auth, setAuth] = useState({
        memberId : null,
        nickName : null,
        accessToken : null,
        refreshToken : null,
        email : null,
        addressLine1 : null,
        addressLine2 : null,
        role : null,
        isAuthenticated : false,
        expiredDate : null,
        isSocialLogin : null
    });

    useEffect(() => {

        const memberId = localStorage.getItem("memberId");
        const nickName = localStorage.getItem("nickName");
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const email = localStorage.getItem("email");
        const addressLine1 = localStorage.getItem("addressLine1");
        const addressLine2 = localStorage.getItem("addressLine2");
        const role = localStorage.getItem("role");
        const expiredDate = localStorage.getItem("expiredDate");
        const isSocialLogin = localStorage.getItem("isSocialLogin");

        console.log('토큰 만료 기간 : '+ expiredDate);

        console.log(Date.now());


        {
            accessToken !== null && (Date.now() > expiredDate) ? 

        authAPI.post('', {
            refreshToken : refreshToken,
        }).then(result => {
            //console.log(result.data);
            const newAcessToken = result.data["accessToken"];
            const newRefreshToken = result.data["refreshToken"];
            const newExpiredDate = result.data["expiredDate"];
            localStorage.setItem("accessToken",newAcessToken);
            localStorage.setItem("refreshToken",newRefreshToken);
            localStorage.setItem("expiredDate", newExpiredDate);
            setAuth({
                memberId,
                nickName,
                accessToken : newAcessToken,
                refreshToken : newRefreshToken,
                email, 
                addressLine1, 
                addressLine2,
                role,
                isAuthenticated : true,
                expiredDate : newExpiredDate,
                isSocialLogin
            });

        }).catch(error => {
            console.log(error.response.data["error-message"]);
            logout();
        })
        :
        accessToken !==null
        ?        
        setAuth({
                memberId,
                nickName,
                accessToken,
                refreshToken,
                email, 
                addressLine1, 
                addressLine2,
                role,
                isAuthenticated : true,
                expiredDate,
                isSocialLogin
        })
        :
        null

    }


    },[]);

    const login = (memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate, isSocialLogin) => {
        setAuth({
            memberId,
            nickName,
            accessToken,
            refreshToken,
            email, 
            addressLine1, 
            addressLine2,
            role,
            isAuthenticated : true,
            expiredDate,
            isSocialLogin
        });

        localStorage.setItem("memberId",memberId);
        localStorage.setItem("nickName",nickName);
        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("refreshToken",refreshToken);
        localStorage.setItem("email",email);
        localStorage.setItem("addressLine1",addressLine1);
        localStorage.setItem("addressLine2",addressLine2);
        localStorage.setItem("role",role);
        localStorage.setItem("expiredDate",expiredDate);
        localStorage.setItem("isSocialLogin",isSocialLogin);
    }

    const logout = () => {
        setAuth({
            memberId : null,
            nickName : null,
            accessToken : null,
            refreshToken : null,
            email : null, 
            addressLine1 : null, 
            addressLine2 : null,
            role : null,
            isAuthenticated : false,
            expiredDate : null,
            isSocialLogin : null
        });

        localStorage.removeItem("memberId");
        localStorage.removeItem("nickName");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        localStorage.removeItem("addressLine1");
        localStorage.removeItem("addressLine2");
        localStorage.removeItem("role");
        localStorage.removeItem("expiredDate");
        localStorage.removeItem("isSocialLogin");

        //navi('/');

    }

    return (
    <AuthContext.Provider value={{auth, kakaoInfo, setKakaoInfo, login, logout}}>
        {children}
    </AuthContext.Provider>
    )
}

