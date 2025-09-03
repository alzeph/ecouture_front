import React from "react";
import { PlatFormContext } from "../providers/PlatformProvider/PlatformProvider";

export const usePlatform = () => {
    const context = React.useContext(PlatFormContext);
    if (!context) {
        throw new Error("usePlatform must be used within a PlatformProvider");
    }
    return context;
};