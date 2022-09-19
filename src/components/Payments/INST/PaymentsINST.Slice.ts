import {createSlice} from "@reduxjs/toolkit";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_CoreConnectStatus,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
    PBX_Monitoring_SEPA_Infrastructure_Enum_OrderBy,
    PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus
} from "../../../services/openapi";

export interface PaymentsINSTQuery {
    companyId: number,
    businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    direction?: PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
    coreConnectStatuses?: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_CoreConnectStatus>,
    sepaStatuses?: Array<string>,
    paymentId?: string,
    transactionId?: string,
    probanxId?: string,
    statuses?: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus>,
    rejectReasons?: Array<string>,
    debtorAccount?: string,
    creditorAccount?: string,
    dateFrom?: string,
    dateTo?: string,
    amountFrom?: number,
    amountTo?: number,
    pageSize?: number,
    page?: number,
    orderBy?: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_OrderBy>
}

export interface PaymentsINST {
    payments:Payment_Contracts_GenerateResponse|null,
    loading: boolean
}

const initialState : PaymentsINST = {
    payments:null,
    loading:false
}

const paymentsINST = createSlice({
    name: 'paymentsINSTSlice',
    initialState,
    reducers: {
        getPayments: ( state, { payload } : { payload: PaymentsINSTQuery } ) => {
            state.loading = true;
        },
        setPayments: ( state, { payload } : { payload: Payment_Contracts_GenerateResponse } ) => {
            state.payments = payload;
            state.loading = false;
        }
    }
});

export const paymentsINSTSliceActions = paymentsINST.actions;
export default paymentsINST.reducer;
