import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate = useNavigate();

    const isLoggedIn = sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]");
    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = "/login";
        }
    }, [isLoggedIn]);

    const onLogout = () => {
        sessionStorage.removeItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]");
        navigate("/login");
    }

    return (
        <div>
            <button onClick={onLogout}>로그아웃</button>
        </div>
    );
};

export default Main;
