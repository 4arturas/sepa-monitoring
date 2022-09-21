import {appConfig} from "../../appConfig";
import {createSlice} from "@reduxjs/toolkit";
import {
    Authentication_Contracts_LogInRequest,
    OpenAPI,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";

export interface LoginPayload {
    email: string;
    code: string;
}

export interface UserInBrowserOrganization {
    name: string | null | undefined,
    connections: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea | undefined>
}

export interface UserInBrowser {
    userId: number,
    email: string,
    role: string,
    companies: Array<UserInBrowserOrganization>
    selectedCompany: UserInBrowserOrganization | null
    jwt: string
}
export interface UserSliceState {
    currentUser: null | UserInBrowser;
    login: {
        loading: boolean;
    }
}

const userData = window.localStorage.getItem(appConfig.storage.user) ?
    JSON.parse(window.localStorage.getItem(appConfig.storage.user) as string) : null;
if ( userData )
    OpenAPI.TOKEN = userData.jwt;


const initialState : UserSliceState = {
    currentUser: userData,
    login: {
        loading: false
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: ( state, { payload } : { payload: Authentication_Contracts_LogInRequest } ) => {
            state.login.loading = true;
        },
        logout: ( state ) => {
            state.currentUser = null;
            window.localStorage.removeItem(appConfig.storage.user);
            OpenAPI.TOKEN = undefined;
        },
        setUserInBrowser: (state, { payload }: { payload: UserInBrowser } ) => {
            state.currentUser = payload;
            state.login.loading = payload ? true : false;
            if ( payload )
            {
                window.localStorage.setItem(appConfig.storage.user, JSON.stringify(payload));
                OpenAPI.TOKEN = payload.jwt;
            }
            else
            {
                window.localStorage.removeItem(appConfig.storage.user);
                OpenAPI.TOKEN = undefined;
            }
        }
    }
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
