import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GameResource from '../../resources/GameResource';
import { socket } from '../../socket';
import { IRootReducer } from '../../store/reducers-types';
import { ICard, ICardType } from '../../types/card';
import { IGameState } from '../../types/game';
import { IAuthReducer } from '../Auth/Auth-types';
import { Card } from '../Card/Card';
import { IGameProps } from './Game-types';
import './Game.scss';

export function Game(_props: IGameProps): JSX.Element {
    const { id: gameId } = useParams();
    const [ gameState, setGameState ] = useState<IGameState>(null);
    const auth = useSelector<IRootReducer>((state) => state.auth) as IAuthReducer;

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

    const formatCardCode = (type: ICardType): string => {
        return `${type.color}${type.value}${type.suit.charAt(0).toUpperCase() + type.suit.slice(1)}`;
    }

    const renderCard = (card: ICard, isHidden: boolean = false) => {
        const isCodexCard = card.index === null && !card.playerId;
        const cardCode = isCodexCard || isHidden ?
            'cardBack' :
            formatCardCode(card.type);

        return (
            <div className="card-wrapper" key={`card-${card.id}`}>
                <Card cardCode={cardCode} />
                {isCodexCard ?
                    <span className={`codex-ring ${gameState.codexColor}`} />
                    : null
                }
            </div>
        );
    };

    const continuumCards = gameState?.cards
        .filter(c => !c.playerId)
        .sort((cardA, cardB) => cardA.index === null ? -1 : cardA.index - cardB.index) ?? [];

    const player = gameState?.players.find(p => p.userId === auth.userId);
    const opponent = gameState?.players.find(p => p.userId !== auth.userId);

    const playerCards = gameState?.cards
        .filter(c => c.playerId === player.id) ?? [];

    const opponentCards = gameState?.cards
        .filter(c => c.playerId && c.playerId !== opponent.id) ?? [];

    return (
        <div className="game">
            <div className="player-cards">
                {opponentCards.map((card) => renderCard(card, true))}
            </div>
            <div className="continuum-cards">
                {continuumCards.map((card) => renderCard(card))}
            </div>
            <div className="player-cards">
                {playerCards.map((card) => renderCard(card))}
            </div>
        </div>
    );
}
