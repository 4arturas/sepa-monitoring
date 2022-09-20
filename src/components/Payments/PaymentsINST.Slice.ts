import {createSlice} from "@reduxjs/toolkit";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_CoreConnectStatus,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
    PBX_Monitoring_SEPA_Infrastructure_Enum_OrderBy,
    PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus
} from "../../services/openapi";


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
    inst: Payment_Contracts_GenerateResponse|null,
    loadingInst: boolean
    sct: Payment_Contracts_GenerateResponse|null,
    loadingSct: boolean
}

const initialState : PaymentsINST = {
    inst:null,
    loadingInst:false,
    sct:null,
    loadingSct: false
}

const payments = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        getPaymentsInst: ( state, { payload } : { payload: PaymentsINSTQuery } ) => {
            state.loadingInst = true;
        },
        setPaymentsInst: ( state, { payload } : { payload: Payment_Contracts_GenerateResponse } ) => {
            state.inst = payload;
            state.loadingInst = false;
        },

        getPaymentsSct: ( state, { payload } : { payload: PaymentsINSTQuery } ) => {
            state.loadingSct = true;
        },
        setPaymentsSct: ( state, { payload } : { payload: Payment_Contracts_GenerateResponse } ) => {
            state.sct = payload;
            state.loadingSct = false;
        }
    }
});

export const paymentsSliceActions = payments.actions;
export default payments.reducer;
