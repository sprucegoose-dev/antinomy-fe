import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUserAvatarProps } from './UserAvatar-types';
import './UserAvatar.scss';

export function UserAvatar(props: IUserAvatarProps): JSX.Element {
    return (
        <div className="user-avatar">
            <span className="user-avatar-icon-wrapper">
                <FontAwesomeIcon className="user-avatar-icon" icon={faUser}/>
            </span>
            <span className="user-avatar-label">
                {props.label}
            </span>
        </div>
    );
}
