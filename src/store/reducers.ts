import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from '../App-reducer';
import { authReducer } from '../components/Auth/Auth-reducer';
import { IRootReducer } from './reducers-types';

export const rootReducer = combineReducers<IRootReducer>({
    app: appReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
