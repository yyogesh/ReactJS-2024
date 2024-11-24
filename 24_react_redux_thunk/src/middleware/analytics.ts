import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const analyticsMiddleware: Middleware<{}, RootState> = () => (next) => (action: any) => {

    if (action.type.startsWith("post/")) {
        console.log('Analytics event', {
            action: action.type,
            timestamp: new Date().toISOString(),
        });
    }

    return next(action);
}