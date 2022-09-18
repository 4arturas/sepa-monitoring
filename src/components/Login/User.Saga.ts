import { fork, put, takeEvery } from 'redux-saga/effects';
import {LoginPayload, userSlice, userSliceActions} from "./User.Slice";
import {helperSliceAction} from "../../store/helper/Helper.Slice";
import {routes} from "../../routes/Routes";

function* loginMiddleWare() : any {
    console.log( 'baba' );
    yield put( helperSliceAction.setRedirectUrl(routes.home.path) );
}

function* loginSaga() {
    yield takeEvery( userSliceActions.login as any, loginMiddleWare );
}

function* logOutMiddleware() {
    yield put(helperSliceAction.setRedirectUrl(routes.login.path))
}

function* logoutSaga() {
    yield takeEvery( userSliceActions.logout as any, loginMiddleWare );
}

export default function* userSaga() {
    yield fork( loginSaga );
    yield fork( logoutSaga );
}