import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = store => next => (action: any) => {
    console.group(action.type);
    console.log("Action:", action);
    console.log("State Before:", store.getState());
    const result = next(action);
    console.log("State After:", store.getState());
    console.groupEnd();

    return result;
};