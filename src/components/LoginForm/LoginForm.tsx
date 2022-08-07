
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginFormType, ILoginFormErrors } from '../../types/login';
import { ILoginFormProps } from './LoginForm-types';
import './LoginForm.scss';
import logo from '../../assets/wc_logo.png';

const defaultErrors = {
    email: '',
    username: '',
    password: '',
    recaptcha: '',
};

const {
    SIGN_IN,
    SIGN_UP,
} = LoginFormType;

export function LoginForm(props: ILoginFormProps): JSX.Element {
    const [formType, setFormType] = useState(SIGN_IN);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors] = useState<ILoginFormErrors>(defaultErrors);

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const toggleLoginFormType = () => {
        setFormType(formType === SIGN_UP ? SIGN_IN : SIGN_UP);
    }

    return (
        <div className="login-form-wrapper">
            <div className="logo">
                <img
                    className="logo"
                    src={logo}
                    alt="War Chest Logo"
                    title="War Chest Logo"
                />
            </div>
            <div className="form-title">
                The Unofficial War Chest Online
            </div>
            <form className="login-form">
                <div className="form-control-wrapper">
                    <input
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        autoComplete="off"
                        onChange={onEmailChange}
                        value={email}
                    />
                    <div className="form-error">
                        {errors.email}
                    </div>
                </div>
                <div className="form-control-wrapper">
                    <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        autoComplete="off"
                        onChange={onPasswordChange}
                        value={password}
                    />
                    <div className="form-error">
                        {errors.email}
                    </div>
                </div>
                <div className="form-control-wrapper recaptcha-control-wrapper">
                    <div className="g-recaptcha">
                        </div>
                    <div className="form-error">
                        {errors.recaptcha}
                    </div>
                </div>
                <div className="form-control-wrapper">
                    <input
                        className="btn btn-primary btn-block"
                        type="submit"
                        value={formType === SIGN_UP ? 'Sign up' : 'Login'}
                    />
                </div>
                <span className="form-type-toggle" onClick={toggleLoginFormType}>
                    { formType === SIGN_UP ? 'Already registered? Click here to login.' : 'Sign up' }
                </span>
            </form>
            <div className="reset-password-wrapper">
                {/* TODO: pass in email to reset link */}
                <Link to="/password-reset" className="link-quaternary">
                    Forgot your password?
                </Link>
            </div>
        </div>
    );
}
