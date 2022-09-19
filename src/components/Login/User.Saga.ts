import { fork, put, takeEvery } from 'redux-saga/effects';
import {LoginPayload, User, userSlice, userSliceActions} from "./User.Slice";
import {helperSliceAction} from "../../store/helper/Helper.Slice";
import {routes} from "../../routes/Routes";
import { Authentication_Contracts_LogInRequest } from "../../services/openapi";

function* loginMiddleWare( {payload} : {payload: Authentication_Contracts_LogInRequest } ) : any {

    /*const response:Authentication_Contracts_LogInResponse = yield AuthenticationsService.postV1AuthenticationsAuthenticatorLogin( payload );
    const user:User = { email: payload.email | 'something wrong' };
    yield put( userSliceActions.setUser( ))
    yield put( helperSliceAction.setRedirectUrl(routes.home.path) );*/
}

function* loginSaga() {
    yield takeEvery( userSliceActions.login as any, loginMiddleWare );
}

function* logOutMiddleware() {
    yield put(helperSliceAction.setRedirectUrl(routes.login.path))
}

function* logoutSaga() {
    yield takeEvery( userSliceActions.logout as any, logOutMiddleware );
}

export default function* userSaga() {
    yield fork( loginSaga );
    yield fork( logoutSaga );
}
