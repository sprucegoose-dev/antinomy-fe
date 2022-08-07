import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from '../App-reducer';

export const rootReducer = combineReducers({
    app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
