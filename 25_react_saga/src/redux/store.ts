import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./sclies/product.slice"
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        // Define your slices here
        products: productReducer
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;