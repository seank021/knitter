import React from "react";
import "../../../css/design.css";
import DesignCreate from "./design-create";
import DesignUpdate from "./design-update";

export const Design = ({ design, setDesign }) => {
    if (design === null) {
        return (
            <DesignCreate setDesign={setDesign} />
        );
    }

    return (
        <DesignUpdate design={design} setDesign={setDesign} />
    );
};

export default Design;
