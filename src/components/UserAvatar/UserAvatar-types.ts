import { UserAvatarTheme } from '../../types/user-avatar';

export interface IUserAvatarState {
}

export interface IUserAvatarProps {
    label?: string;
    linkTo?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    theme?: UserAvatarTheme;
}
