
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import ReCAPTCHA from 'react-google-recaptcha';

import { LoginFormType, ILoginFormErrors } from '../../types/login.interface';
import { ILoginFormProps } from './LoginForm-types';
import './LoginForm.scss';
import logo from '../../assets/antinomy_logo_w.png';
import UserResource from '../../resources/UserResource';
import { useDispatch } from 'react-redux';
import { SET_AUTH_DETAILS } from '../Auth/Auth-types';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signUp } = useParams();
    const [formType, setFormType] = useState<LoginFormType>(signUp ? SIGN_UP : SIGN_IN);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [recaptcha, setRecaptcha] = useState<string>('');
    const [errors, setErrors] = useState<ILoginFormErrors>(defaultErrors);
    const isSignUp = formType === SIGN_UP;

    useEffect(() => {
        setFormType(signUp ? SIGN_UP : SIGN_IN);
    }, [signUp]);

    useEffect(() => {
        if (errors.email && email && validateEmail(email) === null) {
            setErrors({...errors, email: null});
        }
    }, [email]);

    useEffect(() => {
        if (errors.password && password && validatePassword(password) === null) {
            setErrors({...errors, password: null});
        }
    }, [password]);

    useEffect(() => {
        if (errors.username && username && validateUsername(username) === null) {
            setErrors({...errors, username: null});
        }
    }, [username]);

    const validateEmail = (email: string): string => {
        if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/i.test(email)) {
            return null;
        }

        return 'Please enter a valid email.';
    };

    const validatePassword = (text: string): string => {
        const password = String(text).trim();

        if (Boolean((!isSignUp && password.length) || (isSignUp && password.length >= 8))) {
            return null;
        }

        return isSignUp ? 'Please enter a password at least 8 characters long.' :
            'Please enter a password.';
    };

    const validateUsername = (text: string): string  => {
        const username = String(text).trim();

        if (!isSignUp || (isSignUp && username.length >= 3)) {
            return null;
        }

        return 'Please enter a username at least 3 characters long.';

    };

    const validateRecaptcha = (recaptcha: string): string => {
        if (isSignUp) {

            if (recaptcha) {
                return null;
            }

            return 'Please click on the above reCaptcha checkbox';

        }

        return null;
    }

    const formIsValid = (): boolean => {
        const validationErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
            username: validateUsername(username),
            recaptcha: null,
            // recaptcha: validateRecaptcha(recaptcha),
        };

        setErrors(validationErrors);

        return !errors.email && !errors.username && !errors.password && !errors.recaptcha;
    };

    const onRecaptchaSuccess = (recaptcha: string) => {
        setRecaptcha(recaptcha);
        setErrors({...errors, recaptcha: null });
    };

    const toggleLoginFormType = (isSignUp: boolean) => {
        setFormType(isSignUp ? SIGN_IN : SIGN_UP);
    }

    const onSubmit = async () => {
        let response;
        let payload = {
            email,
            username,
            password,
            recaptcha,
        };

        if (!formIsValid()) {
            return;
        }

        if (isSignUp) {
            response = await UserResource.signUp(payload);
        } else {
            response = await UserResource.login(payload)
        }

        const data = await response.json();

        if (response.ok) {
            dispatch({ type: SET_AUTH_DETAILS, ...data });
            toast.success(`You have ${isSignUp ? 'signed up' : 'logged in'} succesfully`);
            return navigate('/rooms');
        } else {
            switch (data.code) {
                case 400:
                case 409:
                    toast.error(data.message);
                    break;
                default:
                    toast.error(`Error signing ${isSignUp ? 'up' : 'in'}`);
                    break;
            }
        }
    }

    return (
        <div className="login-form-wrapper">
            <div className="logo">
                <img
                    className="logo"
                    src={logo}
                    alt="Antinomy Logo"
                    title="Antinomy Logo"
                />
            </div>
            <div className="form-title">
                An Unofficial Adaptation
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
                        type="password"
                    />
                    {errors.password ?
                        <div className="form-error">
                            {errors.password}
                        </div> : null
                    }
                </div>
                {/* <div className={[
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
                </div> */}
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
            {/* <div className="reset-password-wrapper">
                <Link to="/password-reset" className="link-quaternary">
                    Forgot your password?
                </Link>
            </div> */}
        </div>
    );
}
