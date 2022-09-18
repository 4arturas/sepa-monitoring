import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface LoginState {
    token: string
}

const initialState: LoginState = {
    token: String(window.localStorage.getItem('token'))
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setToken: ( state, action: PayloadAction<string> ) => {
            console.log( 'setToken' );
            state.token = action.payload;
        }
    }
});

export const { setToken } = loginSlice.actions;

export const selectToken = ( state: RootState ) => state.token.token;

export default loginSlice.reducer;