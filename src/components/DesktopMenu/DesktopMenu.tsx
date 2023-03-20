import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IMenuItem, MenuItemVisibility } from 'types/menu';
import { UserAvatarTheme } from 'types/user-avatar';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import './DesktopMenu.scss';
import { IRootReducer } from '../../store/reducers-types';
import { RESET_AUTH_DETAILS } from '../Auth/Auth-types';
import { toast } from 'react-toastify';

const {
    ALWAYS,
    LOGGED_OUT,
    LOGGED_IN,
} = MenuItemVisibility;

export const menuItems: IMenuItem[] = [
    {
        label: 'Play',
        path: '/rooms',
        visibility: [ALWAYS],
    },
    {
        label: 'Login',
        path: '/login',
        visibility: [LOGGED_OUT],
    },
    {
        label: 'Sign up',
        path: '/login/signUp',
        visibility: [LOGGED_OUT],
    },
    {
        label: 'Logout',
        path: '/login',
        visibility: [LOGGED_IN],
        callbackName: 'logout',
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
    const dispatch = useDispatch();
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

    const isLoggedIn = Boolean(useSelector<IRootReducer>((state) => state.auth.userId));

    const filteredMenuItems = menuItems.filter(({ visibility }) => filterMenuItem(visibility, isLoggedIn));

    const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const closeUserMenu = () => {
        setUserMenuAnchor(null);
    };

    const logout = () => {
        dispatch({ type: RESET_AUTH_DETAILS });
        toast.success('You have logged out successfully');
    };

    const handleCallback = (callbackName: string) => {
        switch (callbackName) {
            case 'logout':
                logout();
                break;
        }
    }

    return (
        <div className="desktop-menu">
            {filteredMenuItems.map(({ label, path, callbackName }, index) =>
                <Link
                    to={path}
                    key={`menu-item-${index}`}
                    className="menu-item link-secondary"
                    onClick={() => { handleCallback(callbackName) }}
                >
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
                <MenuItem className="menu-item" onClick={logout}>
                    <FontAwesomeIcon className="menu-item-icon icon-logout" icon={faArrowRightFromBracket}/>
                    <span className="menu-item-label">
                        Logout
                    </span>
                </MenuItem>
            </Menu>
        </div>
    );
}
