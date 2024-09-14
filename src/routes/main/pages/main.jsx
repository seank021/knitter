import React, { useState, useEffect } from "react";
import Menu from "../components/menu";
import Design from "../components/design";
import Header from "../components/header";

export const Main = () => {
    const isLoggedIn = sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]");
    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = "/login";
        }
    }, [isLoggedIn]);

    const [design, setDesign] = useState(null);

    return (
        <div className="app flex flex-row justify-center items-center">
            <Menu setDesign={setDesign} />
            <div className="flex-grow">
                <Header />
                <Design />
            </div>
        </div>
    );
};

export default Main;
