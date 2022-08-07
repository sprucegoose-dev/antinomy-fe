
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ILoginFormErrors } from '../../types/login';
import { ILoginFormProps } from './LoginForm-types';
import './LoginForm.scss';
import logo from '../../assets/wc_logo.png';

const defaultErrors = {
    email: '',
    username: '',
    password: '',
    recaptcha: '',
};

export function LoginForm(_props: ILoginFormProps): JSX.Element {
    const isSignUp = true;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<ILoginFormErrors>(defaultErrors);

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

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
                        value={isSignUp ? 'Sign up' : 'Login'}
                    />
                </div>
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
