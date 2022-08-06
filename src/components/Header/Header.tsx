import './Header.scss';
import logo from '../../assets/wc_logo.png';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export function Header(): JSX.Element {
    return (
        <div className="header">
            <div className="logo-wrapper">
                <img
                    className="logo"
                    src={logo}
                    alt="War Chest Logo"
                    title="War Chest Logo"
                />
            </div>
            <MobileMenu />
        </div>
    );
}
