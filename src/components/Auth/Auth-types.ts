export interface IAuthDetails {
    id: number;
    username: string;
    sessionId: string;
    sessionExp: string;
}

export interface IAuthReducer {
    userId: number;
    username: string;
    sessionId: string;
    sessionExp: string;
}

export const SET_AUTH_DETAILS = 'SET_AUTH_DETAILS';
export const RESET_AUTH_DETAILS = 'RESET_AUTH_DETAILS';

export interface ISetAuthDetailsAction {
    type: typeof SET_AUTH_DETAILS;
    id: number;
    username: string;
    sessionId: string;
    sessionExp: string;
}

export interface IResetAuthDetailsAction {
    type: typeof RESET_AUTH_DETAILS;
}

export type IAppActionTypes =
    ISetAuthDetailsAction |
    IResetAuthDetailsAction;
