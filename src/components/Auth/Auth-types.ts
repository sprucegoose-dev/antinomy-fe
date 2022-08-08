export interface IAuthReducer {
    userId: string | null;
    username: string | null;
    sessionId: string | null;
    sessionExp: string | null;
    discord: string | null;
}

export type IAppActionTypes = any;
