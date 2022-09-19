import {all} from "redux-saga/effects";
import userSaga from "./components/Login/User.Saga";
import {companiesSaga} from "./components/Companies/Companies.Saga";
import {usersSaga} from "./components/Users/Users.Saga";
import paymentINSTSaga from "./components/Payments/INST/PaymentsINST.Saga";

export default function* rootSaga() {
    yield all([
        userSaga(),
        companiesSaga(),
        usersSaga(),
        paymentINSTSaga()
    ]);
}
