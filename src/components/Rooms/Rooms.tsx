import { useEffect, useState } from 'react';
import GameResource from '../../resources/GameResource';
import { socket } from '../../socket';
import { CreateGameForm } from '../CreateRoomForm/CreateGameForm';
import { Room } from '../Room/Room';
import { IRoomsProps } from './Rooms-types';
import './Rooms.scss';

export function Rooms(_props: IRoomsProps): JSX.Element {
    const [activeGames, setActiveGames] = useState([]);

    useEffect(() => {
        const fetchActiveGames = async () => {
            const response = await GameResource.getActiveGames();

            if (response.ok) {
                setActiveGames(await response.json());
            }
        }

        fetchActiveGames();

        socket.on('onUpdateActiveGames', fetchActiveGames);

        return () => {
            socket.off('onUpdateActiveGames', fetchActiveGames);
        }
    }, []);

    return (
        <div className="rooms">
            <CreateGameForm />
            <div className="room-list">
                {activeGames.map(game =>
                    <Room
                        key={`room-${game.id}`}
                        gameState={game}
                    />
                )}
            </div>
        </div>
    );
}
