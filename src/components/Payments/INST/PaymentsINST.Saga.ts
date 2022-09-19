import {fork, put, takeEvery} from "redux-saga/effects";
import {PaymentsINSTQuery, paymentsINSTSliceActions} from "./PaymentsINST.Slice";
import {Payment_Contracts_GenerateResponse, PaymentsService} from "../../../services/openapi";

function* getPaymentMiddleware( { payload } : { payload: PaymentsINSTQuery } ) : any {
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
    yield put( paymentsINSTSliceActions.setPayments( response ) );
}

function* getPayment() {
    yield takeEvery( paymentsINSTSliceActions.getPayments as any, getPaymentMiddleware );
}

export default function* paymentINSTSaga()
{
    yield fork( getPayment );
}
