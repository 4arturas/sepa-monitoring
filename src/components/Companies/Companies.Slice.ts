import {Company_Contracts_CompaniesResponse, Company_Contracts_CompanyResponse} from "../../services/openapi";
import {createSlice} from "@reduxjs/toolkit";

export interface CompanyQuery {
    name: string;
}

export interface CompanySlice {
    companiesList:Array<Company_Contracts_CompanyResponse>,
    loading: boolean
}

const initialState : CompanySlice = {
    companiesList: [],
    loading: false
}

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        getCompanies: ( state, { payload } : { payload: CompanyQuery }) => {
            state.loading = true;
        },
        setCompanies: ( state, { payload } : { payload: Company_Contracts_CompaniesResponse } ) => {
            state.companiesList = payload.companies || [];
            state.loading = false;
        }
    }
});

export const companySliceActions = companiesSlice.actions;

export default companiesSlice.reducer;