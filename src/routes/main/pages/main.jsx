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

    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [design, setDesign] = useState(null);

    return (
        <div className="app flex flex-row">
            <Menu setDesign={setDesign} isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <div className={`flex-grow ${isMenuOpen ? 'menu-open' : 'menu-closed'}`}>
                <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
                <Design />
            </div>
        </div>
    );
};

export default Main;
