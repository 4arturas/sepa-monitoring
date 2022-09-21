import {fork, put, takeEvery} from "redux-saga/effects";
import {PaymentsINSTQuery, paymentsSliceActions} from "./Payments.Slice";
import {Payment_Contracts_GenerateResponse, PaymentsService} from "../../services/openapi";


function* getPaymentInstMiddleware( { payload } : { payload: PaymentsINSTQuery } ) : any {
    const response:Payment_Contracts_GenerateResponse = yield PaymentsService.getV1Payments(
        payload.companyId,
        payload.businessArea,
        payload.direction,
        payload.coreConnectStatuses,
        payload.sepaStatuses,
        payload.paymentId,
        payload.transactionId,
        payload.probanxId,
        payload.statuses,
        payload.rejectReasons,
        payload.debtorAccount,
        payload.creditorAccount,
        payload.dateFrom,
        payload.dateTo,
        payload.amountFrom,
        payload.amountTo,
        payload.pageSize,
        payload.page,
        payload.orderBy,
    );
    yield put( paymentsSliceActions.setPaymentsInst( response ) );
}

function* getPaymentInst() {
    yield takeEvery( paymentsSliceActions.getPaymentsInst as any, getPaymentInstMiddleware );
}

function* getPaymentSctMiddleware( { payload } : { payload: PaymentsINSTQuery } ) : any {
    const response:Payment_Contracts_GenerateResponse = yield PaymentsService.getV1Payments(
        payload.companyId,
        payload.businessArea,
        payload.direction,
        payload.coreConnectStatuses,
        payload.sepaStatuses,
        payload.paymentId,
        payload.transactionId,
        payload.probanxId,
        payload.statuses,
        payload.rejectReasons,
        payload.debtorAccount,
        payload.creditorAccount,
        payload.dateFrom,
        payload.dateTo,
        payload.amountFrom,
        payload.amountTo,
        payload.pageSize,
        payload.page,
        payload.orderBy,
    );
    yield put( paymentsSliceActions.setPaymentsSct( response ) );
}

function* getPaymentSct() {
    yield takeEvery( paymentsSliceActions.getPaymentsSct as any, getPaymentSctMiddleware );
}

export default function* paymentsSaga()
{
    yield fork( getPaymentInst );
    yield fork( getPaymentSct );
}
