import React from "react";
import { WindowContext } from "../providers/WindowProvider/WindowProvider";

export const useWindow = () => {
    const context = React.useContext(WindowContext);
    if (!context) {
        throw new Error("useWindow must be used within a WindowProvider");
    }
    return context;
};
