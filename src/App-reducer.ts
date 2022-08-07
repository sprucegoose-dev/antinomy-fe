import {
    IAppActionTypes,
    IAppReducer,
} from './App-types';

const initialState = {
    auth: {
        username: '',
    },
};

export function appReducer(state: IAppReducer = initialState, action: IAppActionTypes) {
    switch (action.type) {
      default:
        return state;
    }
}
