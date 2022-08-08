import {
    IAppActionTypes,
    IAppReducer,
} from './App-types';

const initialState = {
};

export function appReducer(state: IAppReducer = initialState, action: IAppActionTypes): IAppReducer {
    switch (action.type) {
      default:
        return state;
    }
}
