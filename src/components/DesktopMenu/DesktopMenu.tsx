import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMenuItem, MenuItemVisibility } from 'types/menu';
import { UserAvatarTheme } from '../../types/user-avatar';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import './DesktopMenu.scss';

const {
    ALWAYS,
    LOGGED_OUT,
    LOGGED_IN,
} = MenuItemVisibility;

export const menuItems: IMenuItem[] = [
    {
        label: 'Find a game',
        path: '/rooms',
        visibility: [ALWAYS],
    },
    {
        label: 'Leaderboard',
        path: '/leaderbaord',
        visibility: [ALWAYS],
    },
    {
        label: 'Community',
        path: '/users',
        visibility: [ALWAYS],
    },
    {
        label: 'My games',
        path: '/matches',
        visibility: [ALWAYS],
    },
    {
        label: 'How to play',
        path: '/how-to-play',
        visibility: [ALWAYS],
    },
    {
        label: 'Contact',
        path: '/contact-us',
        visibility: [ALWAYS],
    },
    {
        label: 'Login',
        path: '/login',
        visibility: [LOGGED_OUT],
    },
    {
        label: 'Sign up',
        path: '/login',
        params: 'signUp',
        visibility: [LOGGED_OUT],
    },
    {
        label: 'Logout',
        path: '/logout',
        visibility: [LOGGED_IN],
    },
];


export const filterMenuItem = (visibility: MenuItemVisibility[], isLoggedIn: boolean) => {

    if (visibility.includes(ALWAYS)) {
        return true;
    }

    if (visibility.includes(LOGGED_IN) && isLoggedIn) {
        return true;
    }

    if (visibility.includes(LOGGED_OUT) && !isLoggedIn) {
        return true;
    }

    return false;
};


export function DesktopMenu(): JSX.Element {
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

    const isLoggedIn = true; // TODO: set real value

    const filteredMenuItems = menuItems.filter(({ visibility }) => filterMenuItem(visibility, isLoggedIn));

    const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    }

    const closeUserMenu = () => {
        setUserMenuAnchor(null);
    }

    return (
        <div className="desktop-menu">
            {filteredMenuItems.map(({ label, path }, index) =>
                <Link to={path} key={`menu-item-${index}`} className="menu-item link-secondary">
                    {label}
                </Link>
            )}
            <UserAvatar onClick={openUserMenu} />
            <Menu
                anchorEl={userMenuAnchor}
                className="user-menu"
                open={Boolean(userMenuAnchor)}
                onClose={closeUserMenu}
                onClick={closeUserMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    className: 'menu-items-wrapper',
                }}
                MenuListProps={{
                    className: 'menu-items'
                }}
            >
                <UserAvatar label="SpruceGoose" theme={UserAvatarTheme.DARK} />
                <Divider />
                <MenuItem className="menu-item">
                    <Link to="/profile" className="link-tertiary">
                        <FontAwesomeIcon className="menu-item-icon" icon={faUser}/>
                        <span className="menu-item-label">
                            Profile
                        </span>
                    </Link>
                </MenuItem>
                <MenuItem className="menu-item">
                    <Link to="/logout" className="link-tertiary">
                        <FontAwesomeIcon className="menu-item-icon icon-logout" icon={faArrowRightFromBracket}/>
                        <span className="menu-item-label">
                            Logout
                        </span>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}
