export interface ILoginFormErrors {
    email: string | null;
    username: string | null;
    password: string | null;
    recaptcha: string | null;
}

export enum LoginFormType {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN UP'
}
