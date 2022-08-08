import {
    IAppActionTypes,
    IAuthReducer,
} from './Auth-types';

const initialState = {
    userId: null,
    username: null,
    sessionId: null,
    sessionExp: null,
    discord: null,
};

export function authReducer(state: IAuthReducer = initialState, action: IAppActionTypes): IAuthReducer {
    switch (action.type) {
      default:
        return state;
    }
}
