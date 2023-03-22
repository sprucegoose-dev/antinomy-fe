import './Header.scss';
import logo from '../../assets/antinomy_logo_w.png';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { Link } from 'react-router-dom';
import { DesktopMenu } from '../DesktopMenu/DesktopMenu';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../../store/reducers-types';

export function Header(): JSX.Element {
    const isLoggedIn = Boolean(useSelector<IRootReducer>((state) => state.auth.userId));

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
