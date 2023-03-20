import { useEffect, useState } from 'react';
import GameResource from '../../resources/GameResource';
import { CreateGameForm } from '../CreateRoomForm/CreateGameForm';
import { Room } from '../Room/Room';
import { IRoomsProps } from './Rooms-types';
import './Rooms.scss';

export function Rooms(_props: IRoomsProps): JSX.Element {
    const [activeGames, setActiveGames] = useState([]);

    useEffect(() => {
        const fetchActiveGames = async () => {
            const response = await GameResource.getActiveGames();
            setActiveGames(await response.json());
        }

        fetchActiveGames();
    }, []);

    return (
        <div className="rooms">
            <CreateGameForm />
            {activeGames.map(game =>
                <Room
                    gameState={game}
                />
            )}
        </div>
    );
}
