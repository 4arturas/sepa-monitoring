import {fork, put, takeEvery} from "redux-saga/effects";
import {turnoversActions, TurnoversQuery} from "./Turnovers.Slice";
import {Turnover_Contracts_GenerateResponse, TurnoversService} from "../../services/openapi";

function* getTurnoversInstMiddleware( { payload } : { payload: TurnoversQuery } ) : any {
    const response:Turnover_Contracts_GenerateResponse = yield TurnoversService.getV1Turnovers(
        payload.companyId,
        payload.businessArea,
        payload.direction,
        payload.transactionId,
        payload.debtorCode,
        payload.creditorCode,
        payload.debtorAccount,
        payload.creditorAccount,
        payload.dateFrom,
        payload.dateTo,
        payload.amountFrom,
        payload.amountTo,
        payload.pageSize,
        payload.page
    );
    yield put( turnoversActions.setTurnoversINST( response ) );
}

function* getTurnoversInst() {
    yield takeEvery( turnoversActions.getTurnoversINST as any, getTurnoversInstMiddleware );
}

function* getTurnoversSctMiddleware( { payload } : { payload: TurnoversQuery } ) : any {
    const response:Turnover_Contracts_GenerateResponse = yield TurnoversService.getV1Turnovers(
        payload.companyId,
        payload.businessArea,
        payload.direction,
        payload.transactionId,
        payload.debtorCode,
        payload.creditorCode,
        payload.debtorAccount,
        payload.creditorAccount,
        payload.dateFrom,
        payload.dateTo,
        payload.amountFrom,
        payload.amountTo,
        payload.pageSize,
        payload.page
    );
    yield put( turnoversActions.setTurnoversSCT( response ) );
}

function* getTurnoversSct() {
    yield takeEvery( turnoversActions.getTurnoversSCT as any, getTurnoversSctMiddleware );
}

export function* turnoversSaga()
{
    yield fork( getTurnoversInst );
    yield fork( getTurnoversSct );
}
