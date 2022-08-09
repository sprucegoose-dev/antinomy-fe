export interface ICreateUserRequest {
    email: string;
    username: string;
    password: string;
    recaptcha: string | null;
}

export interface ILoginRequest {
    email: string;
    password: string;
}
