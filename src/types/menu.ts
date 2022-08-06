export enum MenuItemVisibility {
    ALWAYS = 'ALWAYS',
    LOGGED_IN = 'LOGGED_IN',
    LOGGED_OUT = 'LOGGED_OUT',
}

export interface IMenuItem {
    visibility: MenuItemVisibility[];
    label: string;
    params?: string;
    path: string;
}
