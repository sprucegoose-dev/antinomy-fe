import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameResource from '../../resources/GameResource';
import { socket } from '../../socket';
import { ICard } from '../../types/card';
import { IGameState } from '../../types/game';
import { Card } from '../Card/Card';
import { IGameProps } from './Game-types';
import './Game.scss';

export function Game(_props: IGameProps): JSX.Element {
    const { id: gameId } = useParams();
    const [ gameState, setGameState ] = useState<IGameState>(null);

    useEffect(() => {
        const getGameState = async () => {
            const response = await GameResource.getState(parseInt(gameId, 10));
            setGameState(await response.json());
        }

        getGameState();

        socket.emit('onJoinGame', gameId);

        return () => {
            socket.emit('onLeaveGame', gameId);
        }
    }, []);

    const renderCard = (card: ICard) => {
        const type = card.type;
        const typeCode = card.index === null ?
            'cardBack' :
            `${type.color}${type.value}${type.suit.charAt(0).toUpperCase() + type.suit.slice(1)}`;

        return <Card typeCode={typeCode} key={`card-${card.id}`} />
    };

    const continuumCards = gameState?.cards
    .filter(c => !c.playerId)
    .sort((cardA, cardB) => cardA.index === null ? -1 : cardA.index - cardB.index) ?? [];

    return (
        <div className="game">
            <div className="cards">
                {continuumCards.map(renderCard)}
            </div>
        </div>
    );
}
