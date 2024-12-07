import { all, fork } from "redux-saga/effects";
import { productSaga } from "./product.saga";

export default function* rootSaga() {
    yield all([
        fork(productSaga),
        // fork is non-blocking task
    ])
}