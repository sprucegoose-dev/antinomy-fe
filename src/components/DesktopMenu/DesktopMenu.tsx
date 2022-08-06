import { IMenuItem, MenuItemVisibility } from 'types/menu';
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

export function DesktopMenu(): JSX.Element {

    return (
        <div className="mobile-menu">
        </div>
    );
}
