import React, { useState } from "react";
import arrowright from '../../../assets/icons/arrowright.svg';
import profile from '../.././../assets/icons/profile.png';

export const Header = ({ isOpen, setIsOpen }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]")));

    const onLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            sessionStorage.removeItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]");
            window.location.href = "/login";
        }
    }

    return (
        <div className="sticky top-0 z-10 flex flex-row w-full h-[30px] justify-between items-center p-[1rem] pt-8 pb-8 border-black border-b-[1px]">
            <div className="flex flex-row items-center gap-1">
                <img src={arrowright} alt="arrowright" className={`${isOpen ? "hidden" : "w-6 h-6 cursor-pointer mr-1"}`} onClick={() => setIsOpen(!isOpen)} />
                <img src={profile} alt="profile" className="w-8 h-8" />
                <div className="text-base">{user.email}</div>
            </div>
            <div onClick={onLogout} className="logout-button">로그아웃</div>
        </div>
    );
}

export default Header;
