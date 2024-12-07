import { all, call, put, takeLatest } from "redux-saga/effects";
import { Product } from "./productTypes";
import { productApi } from "../../services/productApi";
import { productActions } from "./productSlice";

function* fetchProductsSaga() {
    try {
     const products: Product[] = yield call(productApi.fetchProducts);
     yield put(productActions.fetchProductsSuccess(products));
    } catch (e: any) {
        yield put(productActions.fetchProductsFailure(e.message));
    }
}

function* deleteProductSaga(action: ReturnType<typeof productActions.deleteProductRequest>) {
    try {
        const deletedProductId: number = yield call(productApi.deleteProduct, action.payload);
        yield put(productActions.deleteProductSuccess(deletedProductId));
      } catch (error: any) {
        yield put(productActions.deleteProductFailure(error.message));
      }
}

export function* productSaga() {
    yield all([
        takeLatest(productActions.fetchProductsStart, fetchProductsSaga),
        takeLatest(productActions.deleteProductRequest.type, deleteProductSaga)
    ]);
}