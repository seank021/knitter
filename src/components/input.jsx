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

export const TextInputLarge= ({ type, placeholder, value, onChange }) => {
    return (
        <div className="p-2 rounded-lg border border-gray-400">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-[800px] h-[30px] border-none outline-none"
            />
        </div>
    )
}

export const LongTextInput = ({ placeholder, value, onChange }) => {
    return (
        <div className="p-2 rounded-lg border border-gray-400">
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-[800px] h-[100px] border-none outline-none"
            />
        </div>
    )
}
