import UserSlice from "../Login/User.Slice";
import {createSlice} from "@reduxjs/toolkit";
import {
   Company_Contracts_CompanyResponse,
   Microsoft_AspNetCore_Mvc_OkResult,
   User_Contracts_CompaniesRequest,
   User_Contracts_CompaniesResponse,
   User_Contracts_CreateRequest,
   User_Contracts_CreateResponse,
   User_Contracts_UpdateRequest,
   User_Contracts_UpdateResponse,
   User_Contracts_UserCompanies,
   User_Contracts_UserCompanyResponse
} from "../../services/openapi";

export interface UsersQuery {
   id: number
}

export interface UsersSlice {
   companies: Array<User_Contracts_UserCompanyResponse>;
   loading: boolean;

   updatingUser: boolean;
}

const initialState : UsersSlice = {
   companies: [],
   loading: false,

   updatingUser: false
}

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      getUserCompanies: ( state, { payload } : { payload: UsersQuery } ) => {
         state.loading = true;
         // state.companies =
      },
      setUserCompanies: ( state, { payload } : { payload: Array<User_Contracts_UserCompanyResponse>} ) => {
         state.companies = payload;
         state.loading = false;
      },

      updateUserRequest: ( state, { payload } : { payload: { id:number, request:User_Contracts_UpdateRequest } } ) => {
         state.updatingUser = true;
      },
      updateUserResponse: ( state, { payload } : { payload: User_Contracts_UpdateResponse } ) => {
         state.updatingUser = false;
      },

      attachCompanyForTheUserRequest: ( state, { payload } : { payload: { userId:number, request: User_Contracts_CompaniesRequest } } ) => {

      },
      attachCompanyForTheUserResponse: ( state, { payload } : { payload: Microsoft_AspNetCore_Mvc_OkResult } ) => {

      }
   }
});

export const usersSliceActions = usersSlice.actions;
export default usersSlice.reducer;