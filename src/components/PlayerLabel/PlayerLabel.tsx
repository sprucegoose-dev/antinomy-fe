import { IPlayerLabelProps } from './PlayerLabel-types';

export function PlayerLabel({player, activePlayerId} : IPlayerLabelProps): JSX.Element {
    const isActivePlayer = player.id === activePlayerId;

    return (
        <div className="player-label">
            <div className="info-group">
                <div className="label">
                    {player.user.username}
                </div>
                <div className="horizontal-divider"></div>
                <div className="score">
                    Score: {player.points}
                </div>
            </div>
            <div className="turn-indicator-wrapper">
                <div className={`turn-indicator ${isActivePlayer ? 'active' : 'inactive'}`}>
                </div>
            </div>
        </div>
    );
}
