import {createSlice} from "@reduxjs/toolkit";
import {
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction, Turnover_Contracts_GenerateResponse
} from "../../services/openapi";

export interface TurnoversQuery {
    companyId: number,
    businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    direction?: PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
    transactionId?: string,
    debtorCode?: string,
    creditorCode?: string,
    debtorAccount?: string,
    creditorAccount?: string,
    dateFrom?: string,
    dateTo?: string,
    amountFrom?: number,
    amountTo?: number,
    pageSize?: number,
    page?: number,
}

export interface TurnoversSCT {
    inst: Turnover_Contracts_GenerateResponse | null;
    sct: Turnover_Contracts_GenerateResponse | null;
    loadingInst: boolean;
    loadingSct: boolean;
}

const initialState : TurnoversSCT = {
    loadingInst: false,
    loadingSct: false,
    inst: null,
    sct: null
}


const turnoversSlice = createSlice({
    name: 'turnovers',
    initialState,
    reducers: {
        getTurnoversINST: (state, { payload } : { payload: TurnoversQuery } ) => {
            state.loadingInst = true;
            state.inst = null;
        },
        setTurnoversINST: (state, { payload } : { payload: Turnover_Contracts_GenerateResponse } ) => {
            state.loadingInst = false;
            state.inst = payload;
        },
        getTurnoversSCT: (state, { payload } : { payload: TurnoversQuery } ) => {
            state.loadingSct = true;
            state.sct = null;
        },
        setTurnoversSCT: (state, { payload } : { payload: Turnover_Contracts_GenerateResponse } ) => {
            state.loadingSct = false;
            state.sct = payload;
        }
    }
});

export const turnoversActions = turnoversSlice.actions;
export default turnoversSlice.reducer;
