import {createSlice} from "@reduxjs/toolkit";

export interface HelperSlice {
    redirectUrl: string | null
}

const initialState : HelperSlice = {
    redirectUrl: null
}

export const helperSlice = createSlice({
    name: 'helper',
    initialState,
    reducers: {
        setRedirectUrl: (state, { payload }: { payload: string | null }) => {
            state.redirectUrl = payload;
        }
    },
});

export const helperSliceAction = helperSlice.actions;

export default helperSlice.reducer;