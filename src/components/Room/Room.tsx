import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IRootReducer } from '../../store/reducers-types';
import { IAuthReducer } from '../Auth/Auth-types';
import { IRoomProps } from './Room-types';
import { GameState } from '../../types/game';
import GameResource from '../../resources/GameResource';
import './Room.scss';
import { toast } from 'react-toastify';
import { IPlayer } from '../../types/player';

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
    const isCreator = creatorId = auth.userId;

    const renderPlayer = (player: IPlayer) => {
        return (
            <div className="user">
                {player.user.username}
            </div>
        );
    }

    const joinGame = async () => {
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

        }

        return null;
    }

    return (
        <div className="room">
            <div className="users">
                {players.map(renderPlayer)}
            </div>
            <div className="game-state">
                {gameState}
            </div>
            {renderButton()}
        </div>
    );
}
