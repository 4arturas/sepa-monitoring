import {all} from "redux-saga/effects";
import userSaga from "./components/Login/User.Saga";
import {companiesSaga} from "./components/Companies/Companies.Saga";

export default function* rootSaga() {
    yield all([
        userSaga(),
        companiesSaga(),
    ]);
}