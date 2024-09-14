import React from "react";
import '../../../app.css';
import arrowleft from '../../../assets/icons/arrowleft.svg';
import write from '../../../assets/icons/write.svg';

export const Menu = ({ setDesign }) => {
    const onClickArrowLeft = () => {
        console.log("onClickArrowLeft");
    }

    const onClickWrite = () => {
        console.log("onClickWrite");
    }

    return (
        <div className="menu">
            <div className="flex flex-row justify-between items-center mb-5">
                <img onClick={onClickArrowLeft} src={arrowleft} alt="arrowleft" className="w-6 h-6 cursor-pointer" />
                <img onClick={onClickWrite} src={write} alt="write" className="w-6 h-6 cursor-pointer" />
            </div>

            <div>메뉴1</div>
            <div>메뉴2</div>
            <div>메뉴3</div>
        </div>
    );
}

export default Menu;
