import {balancesSliceAction, BalancesSliceQuery} from "./Balances.Slice";
import {fork, put, takeEvery} from "redux-saga/effects";
import {Balance_Contracts_GenerateResponse, BalancesService} from "../../services/openapi";

function* getBalancesInstMiddleware( { payload } : { payload: BalancesSliceQuery } ) : any {
    const balances:Balance_Contracts_GenerateResponse = yield BalancesService.getV1Balances(
        payload.companyId,
        payload.businessArea,
        payload.dateFrom,
        payload.dateTo,
        payload.account,
        payload.pageSize,
        payload.page
    );
    yield put( balancesSliceAction.setBalancesInst( balances ) );
}

function* getBalancesInst() {
    yield takeEvery( balancesSliceAction.getBalancesInst, getBalancesInstMiddleware );
}

function* getBalancesSctMiddleware( { payload } : { payload: BalancesSliceQuery } ) : any {
    const balances:Balance_Contracts_GenerateResponse = yield BalancesService.getV1Balances(
        payload.companyId,
        payload.businessArea,
        payload.dateFrom,
        payload.dateTo,
        payload.account,
        payload.pageSize,
        payload.page
    );
    yield put( balancesSliceAction.setBalancesSct( balances ) );
}

function* getBalancesSct() {
    yield takeEvery( balancesSliceAction.getBalancesSct, getBalancesSctMiddleware );
}

export function* balancesSaga() {
    yield fork( getBalancesInst );
    yield fork( getBalancesSct );
}
