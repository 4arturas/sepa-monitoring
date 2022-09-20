import {UsersQuery, usersSliceActions} from "./Users.Slice";
import {fork, put, takeEvery} from "redux-saga/effects";
import {
    Company_Contracts_CreateResponse, Microsoft_AspNetCore_Mvc_OkResult, User_Contracts_CompaniesRequest,
    User_Contracts_CompaniesResponse,
    User_Contracts_UpdateRequest,
    UsersService
} from "../../services/openapi";

function* getUserCompaniesMiddleWare( { payload } : { payload: UsersQuery } ) : any {
    const userCompanies:User_Contracts_CompaniesResponse = yield UsersService.getV1UsersCompanies( payload.id );
    yield put( usersSliceActions.setUserCompanies( userCompanies.company || [] ) );
}

function* getUserCompanies() {
    yield takeEvery( usersSliceActions.getUserCompanies, getUserCompaniesMiddleWare );
}

function *updateUserMiddleWare( { payload } : { payload: { id:number, request:User_Contracts_UpdateRequest } } ) : any {
    // const result:Company_Contracts_CreateResponse = yield UsersService.postV1Users( payload );
    const result:Company_Contracts_CreateResponse = yield UsersService.putV1Users( payload.id, payload.request );
    console.log( 'updateUserMiddleWare', result );
    yield put( usersSliceActions.updateUserResponse( result ) );
}

function *updateUser() {
    yield takeEvery( usersSliceActions.updateUserRequest, updateUserMiddleWare );
}

function* attachCompanyForTheUserMiddleware( { payload } : { payload: { userId:number, request: User_Contracts_CompaniesRequest } } ) : any {
    const result:Microsoft_AspNetCore_Mvc_OkResult = yield UsersService.postV1UsersCompanies( payload.userId, payload.request );
    yield put( usersSliceActions.attachCompanyForTheUserResponse( result ) );
}

function* attachCompanyForTheUser() {
    yield takeEvery( usersSliceActions.attachCompanyForTheUserRequest, attachCompanyForTheUserMiddleware );
}

export function* usersSaga() {
    yield fork( getUserCompanies );
    yield fork( updateUser );
    yield fork( attachCompanyForTheUser );
}
