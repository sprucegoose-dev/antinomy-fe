
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { LoginFormType, ILoginFormErrors } from '../../types/login';
import { ILoginFormProps } from './LoginForm-types';
import './LoginForm.scss';
import logo from '../../assets/wc_logo.png';

const defaultErrors = {
    email: null,
    username: null,
    password: null,
    recaptcha: null,
};

const {
    SIGN_IN,
    SIGN_UP,
} = LoginFormType;

export function LoginForm(_props: ILoginFormProps): JSX.Element {
    const [formType, setFormType] = useState<LoginFormType>(SIGN_IN);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [recaptcha, setRecaptcha] = useState<string | null>('');
    const [errors, setErrors] = useState<ILoginFormErrors>(defaultErrors);

    const isSignUp = formType === SIGN_UP;

    const validateEmail = (email: string) => {
        return /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/i.test(email);
    };

    const validatePassword = (text: string) => {
        const password = String(text).trim();
        return Boolean((!isSignUp && password.length) || (isSignUp && password.length >= 8));
    };

    const validateUsername = (text: string) => {
        const username = String(text).trim();
        return !isSignUp || (isSignUp && username.length >= 3);
    };

    const validateForm = () => {
        const passwordMsg = isSignUp ? 'Please enter a password at least 8 characters long.' :
            'Please enter a password.';
        const usernameMsg = 'Please enter a username at least 3 characters long.';
        const emailMsg = 'Please enter a valid email.';
        const recaptchaMsg = 'Please click on the above reCaptcha checkbox';

        const validationErrors = {
            email: !validateEmail(email) ? emailMsg : null,
            password: !validatePassword(password) ? passwordMsg : null,
            username: !validateUsername(username) ? usernameMsg : null,
            recaptcha: isSignUp ? (recaptcha ? null : recaptchaMsg) : null,
        };

        setErrors(validationErrors);

        return !errors.email && !errors.username && !errors.password && !errors.recaptcha;
    };

    const onRecaptchaSuccess = (recaptcha: string | null) => {
        setRecaptcha(recaptcha);
        setErrors({...errors, recaptcha: null });
    };

    const toggleLoginFormType = (isSignUp: boolean) => {
        setFormType(isSignUp ? SIGN_IN : SIGN_UP);
    }

    const onSubmit = () => {
        if (!validateForm()) {
            return;
        }

        // const url = `/user/${isSignUp ? 'signUp' : 'login'}`;
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
            <div className="login-form">
                <div className="form-control-wrapper">
                    <input
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        autoComplete="off"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                        {errors.email ?
                            <div className="form-error">
                                {errors.email}
                            </div> : null
                        }
                </div>
                {isSignUp ?
                    <div className="form-control-wrapper">
                        <input
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            autoComplete="off"
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                        />
                        {errors.username ?
                            <div className="form-error">
                                {errors.username}
                            </div> : null
                        }
                    </div> : null
                }
                <div className="form-control-wrapper">
                    <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        autoComplete="off"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                    {errors.password ?
                        <div className="form-error">
                            {errors.password}
                        </div> : null
                    }
                </div>
                {/* TODO: show for sign up only */}
                <div className={[
                        'form-control-wrapper',
                        'recaptcha-wrapper',
                        isSignUp ? '' : 'hidden'
                    ].join(' ')}
                >
                    <ReCAPTCHA
                        sitekey="6LcsIv4UAAAAANRU1PiEW4WhFg8uiRkNQ1KbQ-x_"
                        onChange={onRecaptchaSuccess}
                    />
                    {errors.recaptcha ?
                        <div className="form-error recaptcha">
                            {errors.recaptcha}
                        </div> : null
                    }
                </div>
                <div className="form-control-wrapper">
                    <button
                        className="btn btn-primary btn-block"
                        type="submit"
                        onClick={onSubmit}
                    >
                        {formType === SIGN_UP ? 'Sign up' : 'Login'}
                    </button>
                </div>
                <span className="form-type-toggle" onClick={() => toggleLoginFormType(isSignUp)}>
                    { formType === SIGN_UP ? 'Already registered? Click here to login.' : 'Sign up' }
                </span>
            </div>
            <div className="reset-password-wrapper">
                {/* TODO: pass in email to reset link */}
                <Link to="/password-reset" className="link-quaternary">
                    Forgot your password?
                </Link>
            </div>
        </div>
    );
}
