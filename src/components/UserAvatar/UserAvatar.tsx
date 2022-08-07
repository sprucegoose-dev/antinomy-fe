import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { IUserAvatarProps } from './UserAvatar-types';
import './UserAvatar.scss';

export function UserAvatar({ label, linkTo }: IUserAvatarProps): JSX.Element {

    const avatar = (
        <div className="user-avatar">
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
