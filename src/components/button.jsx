import React from "react";

export const Button = ({ onClick, bgColor, children }) => {
    return (
        <div onClick={onClick} className={`p-2 rounded-lg cursor-pointer bg-black hover:bg-gray-700`}>
            <button className="btn w-[150px] h-[30px] text-white font-medium">
                {children}
            </button>
        </div>
    )
}
