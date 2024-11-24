import { configureStore, Middleware, type ConfigureStoreOptions } from "@reduxjs/toolkit";
import postReducer from '../features/posts/postsSlice'
import { analyticsMiddleware } from "../middleware/analytics";
import { loggerMiddleware } from "../middleware/logger";

// type GetDefaultMiddleware = ConfigureStoreOptions['getDefaultMiddleware']

export const store: any = configureStore({
    reducer: {
        posts: postReducer
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(analyticsMiddleware, loggerMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;