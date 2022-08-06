import { useState } from 'react';

import './MobileMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Drawer } from '@mui/material';

export function MobileMenu(): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <div className="mobile-menu">
            <FontAwesomeIcon
                className="menu-btn"
                icon={faBars}
                onClick={() => setOpen(true)}
            />
            <Drawer
                className="mobile-menu-drawer"
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    className: "mobile-menu-paper",
                }}
            >
            </Drawer>
        </div>
    );
}
