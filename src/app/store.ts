import {configureStore, ThunkAction, Action, applyMiddleware} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tokenReducer from '../components/Login/loginSlice';

import createSagaMiddleware from 'redux-saga'
import helperSlice from "../store/helper/Helper.Slice";
import userSlice from "../components/Login/User.Slice";
import rootSaga from "../rootSaga";
import companySlice from "../components/Companies/Companies.Slice";
import usersSlice from "../components/Users/Users.Slice";
import turnoversSlice from "../components/Turnovers/Turnovers.Slice";
import paymentsINSTSlice from "../components/Payments/PaymentsINST.Slice";
import balancesSlice from "../components/Balances/Balances.Slice";
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];

const appState: any = {

}

export const store = configureStore({
  reducer: {
    helper:       helperSlice,
    user:         userSlice,
    users:        usersSlice,
    company:      companySlice,
    counter:      counterReducer,
    token:        tokenReducer,
    payments:     paymentsINSTSlice,
    turnovers:    turnoversSlice,
    balances:     balancesSlice
  },
  preloadedState: appState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
