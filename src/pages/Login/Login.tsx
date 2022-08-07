
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { ILoginProps } from './Login-types';
import './Login.scss';

export function Login(_props: ILoginProps): JSX.Element {
    console.log('login');

    return (
        <div className="login">
            <LoginForm />
        </div>
    );
}
