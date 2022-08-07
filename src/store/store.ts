import { rootReducer } from './reducers';

import { configureStore } from '@reduxjs/toolkit'
// ...
const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
