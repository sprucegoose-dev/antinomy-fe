export interface ILoginFormErrors {
    email: string;
    username: string;
    password: string;
}

export enum LoginFormType {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN UP'
}
