import {createSlice} from "@reduxjs/toolkit";
import {
    Balance_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";

export interface BalancesSliceQuery {
    companyId: number,
    businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    dateFrom?: string,
    dateTo?: string,
    account?: string,
    pageSize?: number,
    page?: number,
}

export interface BalancesSlice {
    inst: Balance_Contracts_GenerateResponse | null,
    loadingInst: boolean
    sct: Balance_Contracts_GenerateResponse | null,
    loadingSct: boolean
}

const initialState : BalancesSlice = {
    inst: null,
    loadingInst: false,
    sct: null,
    loadingSct: false
}

const balancesSlice = createSlice({
    name: 'balances',
    initialState,
    reducers: {
        getBalancesInst: ( state, { payload } : { payload: BalancesSliceQuery } ) => {
            state.loadingInst = true;
        },
        setBalancesInst: ( state, { payload } : { payload: Balance_Contracts_GenerateResponse } ) => {
            state.inst = payload;
            state.loadingInst = false;
        },
        getBalancesSct: ( state, { payload } : { payload: BalancesSliceQuery } ) => {
            state.loadingSct = true;
        },
        setBalancesSct: ( state, { payload } : { payload: Balance_Contracts_GenerateResponse } ) => {
            state.sct = payload;
            state.loadingSct = false;
        },
    }
});

export const balancesSliceAction = balancesSlice.actions;
export default balancesSlice.reducer;

