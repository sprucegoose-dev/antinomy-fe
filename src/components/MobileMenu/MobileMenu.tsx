import { useState } from 'react';

import './MobileMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Drawer } from '@mui/material';
import { filterMenuItem, menuItems } from '../DesktopMenu/DesktopMenu';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../UserAvatar/UserAvatar';

export function MobileMenu(): JSX.Element {
    const [open, setOpen] = useState(false);

    const isLoggedIn = false; // TODO: set real value

    const filteredMenuItems = menuItems.filter(({ visibility }) => filterMenuItem(visibility, isLoggedIn));

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
                {/* set real  value */}
                <UserAvatar label="SpruceGoose" linkTo="/profile" />
                {filteredMenuItems.map(({ label, path }, index) =>
                    <Link to={path} key={`menu-item-${index}`} className="menu-item link-secondary">
                        {label}
                    </Link>
                )}
            </Drawer>
        </div>
    );
}
