import {appConfig} from "../../appConfig";
import {createSlice} from "@reduxjs/toolkit";

export interface LoginPayload {
    email: string;
    code: string;
}

export interface User {
    email: string
}
export interface UserSliceState {
    currentUser: null | User;
    login: {
        loading: boolean;
    }
}

const userData = window.localStorage.getItem(appConfig.storage.user) ?
    JSON.parse(window.localStorage.getItem(appConfig.storage.user) as string) : null;

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
        login: ( state, { payload } : { payload: LoginPayload } ) => {
            state.login.loading = true;
            console.log( 'logging in', state.currentUser, payload );
        },
        logout: ( state ) => {
            state.currentUser = null;
            window.localStorage.removeItem(appConfig.storage.user);
        },
        setUser: ( state, { payload }: { payload: User } ) => {
            state.currentUser = payload;
            state.login.loading = payload ? true : false;
            if ( payload )
                window.localStorage.setItem(appConfig.storage.user, JSON.stringify(payload));
            else
                window.localStorage.removeItem(appConfig.storage.user);
        }
    }
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;