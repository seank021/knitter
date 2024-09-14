import React from "react";
import "../../../css/design.css";
import DesignCreate from "./design-create";
import DesignUpdate from "./design-update";

export const Design = ({ design }) => {
    if (design === null) {
        return (
            <DesignCreate />
        );
    }

    return (
        <DesignUpdate design={design} />
    );
};

export default Design;
