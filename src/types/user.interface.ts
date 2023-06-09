export interface ISignUpRequest {
    email: string;
    username: string;
    password: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IUser {
    username: string;
    id: number;
}
