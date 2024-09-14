import React from "react";

export const ColorPicker = ({ color, onChange }) => (
    <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer"
    />
);

export default ColorPicker;
