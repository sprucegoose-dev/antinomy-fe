import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { UserAvatarTheme } from '../../types/user-avatar';
import { IUserAvatarProps } from './UserAvatar-types';
import './UserAvatar.scss';

export function UserAvatar({
    label,
    linkTo,
    onClick,
    theme = UserAvatarTheme.LIGHT,
}: IUserAvatarProps): JSX.Element {

    const avatar = (
        <div className={`user-avatar ${theme}`} onClick={(event) => onClick ? onClick(event) : null}>
            <span className="user-avatar-icon-wrapper">
                <FontAwesomeIcon className="user-avatar-icon" icon={faUser}/>
            </span>
            {label ?
                <span className="user-avatar-label">
                    {label}
                </span> : null
            }
        </div>
    );

    return (
        linkTo ?
            <Link to={linkTo}>
                {avatar}
            </Link> :
            avatar
    );
}
