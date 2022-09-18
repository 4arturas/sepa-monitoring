import {fork, put, takeEvery} from "redux-saga/effects";
import {CompanyQuery, companiesSlice, companySliceActions} from "./Companies.Slice";
import {
    CompaniesService,
    Company_Contracts_CompaniesResponse,
    Company_Contracts_CompanyResponse
} from "../../services/openapi";

function* companiesSagaMiddleWare( { payload } : { payload: CompanyQuery }) : any {
    console.log( 'companySagaMiddleWare', 'payload', payload );
    const companiesResponse:Company_Contracts_CompaniesResponse = yield CompaniesService.getV1Companies();
    yield put( companySliceActions.setCompanies(companiesResponse));
    console.log( 'companySagaMiddleWare', companiesResponse );
}

function* companiesListQuery() {
    yield takeEvery( companySliceActions.getCompanies, companiesSagaMiddleWare );
}

export function* companiesSaga() {
    yield fork( companiesListQuery );
}