import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IRootReducer } from '../../store/reducers-types';
import { IAuthReducer } from '../Auth/Auth-types';
import { IRoomProps } from './Room-types';
import { GameState } from '../../types/game.interface';
import GameResource from '../../resources/GameResource';
import './Room.scss';
import { toast } from 'react-toastify';
import { IPlayer } from '../../types/player.interface';

export function Room({
    gameState: {
        state: gameState,
        players,
        creatorId,
        id: gameId,
    },
}: IRoomProps): JSX.Element {
    const auth = useSelector<IRootReducer>((state) => state.auth) as IAuthReducer;
    const navigate = useNavigate();

    const userInGame = players.find(p => p.userId === auth.userId);
    const isCreator = creatorId === auth.userId;

    const renderPlayer = (player: IPlayer) => {
        return (
            <span className="player" key={player.id}>
                {player.user.username}
            </span>
        );
    }

    const renderGameStateLabel = (gameState: GameState) => {
        let label: string = gameState;

        if (label === GameState.CREATED) {
            label = 'Waiting for opponent';

            if (players.length === 2) {
                label = 'Waiting to start';
            }
        }

        if (label === GameState.SETUP) {
            label = 'Selecting starting positions';
        }

        return (
            <span className="game-state-label">
                {label.slice(0, 1).toUpperCase() + label.slice(1)}
            </span>
        );
    }

    const joinGame = async () => {
        if (!auth.userId) {
            toast.error('Please sign in before joining a game');
            navigate('/login');
            return;
        }

        const response = await GameResource.join(gameId);

        if (response.ok) {
            toast.success('Joined game successully');
        } else {
            toast.error('Error joining game');
        }
    }

    const startGame = async () => {
        const response = await GameResource.start(gameId);

        if (response.ok) {
            toast.success('Game started successully');
            navigate(`game/${gameId}`);
        } else {
            toast.error('Error starting game');
        }
    }

    const renderButton = () => {
        if (gameState === GameState.CREATED) {
            const awaitingPlayers = players.length < 2;

            if (isCreator) {
                return (
                    <button
                        className={`btn btn-primary btn-block ${awaitingPlayers ? 'btn-disabled' : ''}`}
                        type="submit"
                        onClick={startGame}
                        disabled={awaitingPlayers}
                    >
                        Start
                    </button>
                );
            } else if (!userInGame && awaitingPlayers) {
                return (
                    <button
                        className="btn btn-primary btn-block"
                        type="submit"
                        onClick={joinGame}
                    >
                        Join
                    </button>
                );
            }
        } else if (userInGame) {
            return (
                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    onClick={() => navigate(`/game/${gameId}`)}
                >
                    Rejoin
                </button>
            );
        }

        return null;
    }

    return (
        <div className="room">
            <div className="players">
                {players.map(renderPlayer)}
            </div>
            <div className="game-state">
                {renderGameStateLabel(gameState)}
            </div>
            {renderButton()}
        </div>
    );
}
