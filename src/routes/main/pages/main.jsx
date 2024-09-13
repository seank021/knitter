import React from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate = useNavigate();

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
