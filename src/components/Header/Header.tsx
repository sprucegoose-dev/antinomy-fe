import './Header.scss';
import logo from '../../assets/wc_logo.png';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { Link } from 'react-router-dom';
import { DesktopMenu } from '../DesktopMenu/DesktopMenu';

export function Header(): JSX.Element {
    return (
        <div className="header">
            <Link className="logo-wrapper" to="/">
                <img
                    className="logo"
                    src={logo}
                    alt="War Chest Logo"
                    title="War Chest Logo"
                />
            </Link>
            <DesktopMenu />
            <MobileMenu />
        </div>
    );
}
