import { UserAvatarTheme } from '../../types/user-avatar.interface';

export interface IUserAvatarState {
}

export interface IUserAvatarProps {
    label?: string;
    linkTo?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    theme?: UserAvatarTheme;
}
