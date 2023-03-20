import {
    IAppActionTypes,
    IAuthReducer,
    RESET_AUTH_DETAILS,
    SET_AUTH_DETAILS,
} from './Auth-types';

const initialState = {
    userId: null,
    username: null,
    sessionId: null,
    sessionExp: null,
};

export function authReducer(state: IAuthReducer = initialState, action: IAppActionTypes): IAuthReducer {
    switch (action.type) {
        case SET_AUTH_DETAILS:
            return {
                ...state,
                userId: action.userId,
                username: action.username,
                sessionExp: action.sessionExp,
                sessionId: action.sessionId,
            };
        case RESET_AUTH_DETAILS:
            return {
                ...state,
                userId: null,
                username: null,
                sessionExp: null,
                sessionId: null,
            };
      default:
        return state;
    }
}
