import { Link } from 'react-router-dom';
import { IMenuItem, MenuItemVisibility } from 'types/menu';
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
        path: '/login',
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

    const isLoggedIn = true; // TODO: set real value

    const filteredMenuItems = menuItems.filter(({ visibility }) => filterMenuItem(visibility, isLoggedIn));

    return (
        <div className="desktop-menu">
            {filteredMenuItems.map(({ label, path }, index) =>
                <Link to={path} key={`menu-item-${index}`} className="menu-item link-secondary">
                    {label}
                </Link>
            )}
            <UserAvatar />
        </div>
    );
}
