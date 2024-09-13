import React from "react";

export const TextInput = ({ type, placeholder, value, onChange }) => {
    return (
        <div className="p-2 rounded-lg border border-gray-400">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-[400px] h-[30px] border-none outline-none"
            />
        </div>
    )
}
