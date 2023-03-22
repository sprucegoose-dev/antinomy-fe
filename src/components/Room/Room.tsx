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
import { useEffect, useState } from 'react';

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
    const [prevGameState] = useState(gameState);

    useEffect(() => {
        if (prevGameState === GameState.CREATED && gameState === GameState.SETUP) {
            navigate(`/game/${gameId}`);
        }
    }, [gameState, gameId, navigate, prevGameState])

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

    const leaveGame = async () => {
        const response = await GameResource.leave(gameId);

        navigate('/rooms');

        if (response.ok) {
            toast.success('Left game successfully');
        } else {
            toast.error('Error leaving game');
        }
    }

    const joinGame = async () => {
        if (!auth.userId) {
            toast.error('Please sign in before joining a game');
            navigate('/login');
            return;
        }

        const response = await GameResource.join(gameId);

        if (response.ok) {
            toast.success('Joined game successfully');
        } else {
            toast.error('Error joining game');
        }
    }

    const startGame = async () => {
        const response = await GameResource.start(gameId);

        if (response.ok) {
            toast.success('Game started successfully');
        } else {
            toast.error('Error starting game');
        }
    }

    const renderButton = () => {
        const awaitingPlayers = players.length < 2;
        const buttons = [];

        if (userInGame) {
            buttons.push(
                <button
                    className="btn btn-outline btn-block"
                    type="submit"
                    onClick={leaveGame}
                    key="leave-btn"
                >
                    Leave
                </button>
            )
        }

        if (gameState === GameState.CREATED) {

            if (isCreator) {
                buttons.push(
                    <button
                        className={`btn btn-primary btn-block ${awaitingPlayers ? 'btn-disabled' : ''}`}
                        type="submit"
                        onClick={startGame}
                        disabled={awaitingPlayers}
                        key="start-btn"
                    >
                        Start
                    </button>
                );
            } else if (awaitingPlayers) {
                buttons.push(
                    <button
                        className="btn btn-primary btn-block"
                        type="submit"
                        onClick={joinGame}
                        key="join-btn"
                    >
                        Join
                    </button>
                )
            }
        } else {
            buttons.push(
                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    onClick={() => navigate(`/game/${gameId}`)}
                    key="rejoin-btn"
                >
                    Rejoin
                </button>
            )
        }

        if (buttons.length === 2) {
            return (
                <div className="btn-group">
                    {buttons.map(btn => btn)}
                </div>
            )
        }

        return buttons.map(btn => btn);
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
