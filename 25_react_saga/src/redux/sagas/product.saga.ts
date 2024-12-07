import { call, put, takeLatest } from "redux-saga/effects";
import { Product } from "../../@types/product";
import axios from "axios";
import { fetchProducts, fetchProductsFailure, fetchProductsSuccess } from "../sclies/product.slice";

function* fetchProductSaga() {
    try {
        const response : {data: Product[]} = yield call(
            axios.get,
            'https://fakestoreapi.com/products'
        );

        yield put(fetchProductsSuccess(response.data));
    } catch (error: any) {
       yield put(fetchProductsFailure(error.message));
    }
}


export function* productSaga() {
    yield takeLatest(fetchProducts.type, fetchProductSaga)
}