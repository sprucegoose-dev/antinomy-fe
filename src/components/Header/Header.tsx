import './Header.scss';
import logo from '../../assets/antinomy_logo_w.png';
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
                    alt="Antinomy Logo"
                    title="Antinomy Logo"
                />
            </Link>
            <DesktopMenu />
            <MobileMenu />
        </div>
    );
}
