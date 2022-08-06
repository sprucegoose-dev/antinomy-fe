import { useState } from 'react';

import './MobileMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Drawer } from '@mui/material';
import { menuItems } from '../DesktopMenu/DesktopMenu';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { IMenuItem, MenuItemVisibility } from '../../types/menu';

export function MobileMenu(): JSX.Element {
    const [open, setOpen] = useState(false);

    const isLoggedIn = true; // TODO: set real value

    const filterMenuItem = ({ visibility }: IMenuItem) => {

        if (visibility.includes(MenuItemVisibility.ALWAYS)) {
            return true;
        }

        if (visibility.includes(MenuItemVisibility.LOGGED_IN) && isLoggedIn) {
            return true;
        }

        if (visibility.includes(MenuItemVisibility.LOGGED_OUT) && !isLoggedIn) {
            return true;
        }

        return false;
    };

    return (
        <div className="mobile-menu">
            <FontAwesomeIcon
                className="menu-btn"
                icon={faBars}
                onClick={() => setOpen(true)}
            />
            <Drawer
                className="mobile-menu-sidebar"
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    className: "mobile-menu-sidebar-content",
                }}
            >
                {/* TODO: set real value  */}
                <UserAvatar label="SpruceGoose" />
                {menuItems.filter(filterMenuItem).map(({ label, path }, index) =>
                    <Link to={path} key={`menu-item-${index}`} className="menu-item link-secondary">
                        {label}
                    </Link>
                )}
            </Drawer>
        </div>
    );
}
