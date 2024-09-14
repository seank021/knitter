import React from "react";
import "../../../css/design.css";

export const Design = ({ design }) => {
    if (design === null) {
        return <div className="flex flex-col h-full justify-center items-center">Select a design</div>;
    }

    return (
        <div className="design-wrapper">
            <div
                className="design-container"
                style={{
                    '--grid-width': design.width,
                    '--grid-height': design.height
                }}
            >
                {Array.from({ length: design.width * design.height }).map((_, index) => {
                    const row = Math.floor(index / design.width);
                    const column = index % design.width;
                    const cell = design.cells.find(c => c.row === row && c.column === column);
                    const backgroundColor = cell ? cell.color : "#fff"; // Default to white if no color
                    return (
                        <div
                            key={index}
                            className="cell"
                            style={{ backgroundColor }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Design;
