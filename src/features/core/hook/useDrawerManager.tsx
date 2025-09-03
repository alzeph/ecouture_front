import React from "react";
import { DrawerContext } from "../providers/DrawerProvider/DrawerProvider";

export const useDrawerManager = () => {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerManager must be used within a DrawerContext");
  }
  const { confirmationAction, ...rest } = context
  return rest;
};

export const useConfirmationAction = () => {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerManager must be used within a DrawerContext");
  }
  return context.confirmationAction;
};
