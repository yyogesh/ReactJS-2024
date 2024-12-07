import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import createSagaMiddleware from "redux-saga";
import { productSaga } from "../features/products/productSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        products: productReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(productSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;