import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket';
import { IGameProps } from './Game-types';
import './Game.scss';

export function Game(_props: IGameProps): JSX.Element {
    const { id: gameId } = useParams();

    useEffect(() => {
        socket.emit('onJoinGame', gameId);

        return () => {
            socket.emit('onLeaveGame', gameId);
        }
    }, []);

    return (
        <div className="game">
            Game
        </div>
    );
}
