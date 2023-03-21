import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GameResource from '../../resources/GameResource';
import { socket } from '../../socket';
import { IRootReducer } from '../../store/reducers-types';
import { ICard, ICardType } from '../../types/card.interface';
import { IActionPayload, IGameState } from '../../types/game.interface';
import { IPlayer, PlayerOrientation } from '../../types/player.interface';
import { IAuthReducer } from '../Auth/Auth-types';
import { Card } from '../Card/Card';
import { IGameProps } from './Game-types';
import './Game.scss';

const CARD_WIDTH_TO_HEIGHT_RATIO = 0.7374301676;

export function Game(_props: IGameProps): JSX.Element {
    const { id: gameId } = useParams();
    const [ gameState, setGameState ] = useState<IGameState>(null);
    const [ actions, setActions ] = useState<IActionPayload[]>([]);
    const [ continuumWidth, setContinuumWidth ] = useState(0);
    const auth = useSelector<IRootReducer>((state) => state.auth) as IAuthReducer;
    const continuumRef = useRef(null);

    const onWindowReize = () => {
        setContinuumWidth(continuumRef.current?.offsetWidth ?? 0);
    }

    useEffect(() => {
        const getGameState = async () => {
            const response = await GameResource.getState(parseInt(gameId, 10));
            setGameState(await response.json());
        }

        const getActions = async () => {
            const response = await GameResource.getActions(parseInt(gameId, 10));
            setActions(await response.json());
        }

        const getUpdatedGameState = async () => {
            await getGameState();
            await getActions();
        }

        getGameState();
        getActions();

        setContinuumWidth(continuumRef.current?.offsetWidth ?? 0);

        window.addEventListener('resize', onWindowReize);

        socket.emit('onJoinGame', gameId);
        socket.on('onUpdateGameState', getUpdatedGameState);

        return () => {
            window.removeEventListener('resize', onWindowReize);
            socket.emit('onLeaveGame', gameId);
            socket.off('onUpdateGameState', getUpdatedGameState);
        }
    }, []);

    const capitalize = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const formatCardCode = (type: ICardType): string => {
        return `${type.color}${type.value}${capitalize(type.suit)}`;
    }

    const renderWizardCard = (orientation: PlayerOrientation) =>  {
        return <Card cardCode={`wizard${capitalize(orientation)}`} />;
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

    const renderPlayerLabel = (player: IPlayer) => {
        const isActivePlayer = player.id === gameState.activePlayerId;

        return (
            <div className="player-label">
                <div className="label">
                    {player.user.username}
                </div>
                <div className="divider">
                    |
                </div>
                <div className="score">
                    Score: {player.points}
                </div>
                <div className="divider">
                    |
                </div>
                <div className={`turn-indicator ${isActivePlayer ? 'active' : 'inactive'}`}>
                </div>
            </div>
        );
    }

    const renderPlayerArea = (player: IPlayer, cards: ICard[], isOpponent: boolean = false) => {
        return (
            <div className={`player-area ${player.orientation} ${isOpponent ? 'is-opponent' : ''}`}>
                {!isOpponent && renderPlayerLabel(player)}
                <div className="player-cards">
                    {!isOpponent && !player.position && renderWizardCard(player.orientation)}
                    {cards.map((card) => renderCard(card, isOpponent))}
                    {isOpponent && !player.position && renderWizardCard(player.orientation)}
                </div>
                {isOpponent && renderPlayerLabel(player)}
            </div>
        );
    }

    const renderWizardPosition = (player: IPlayer, card: ICard) => {
        const cardWidth = continuumWidth * .1;
        const cardHeight = cardWidth / CARD_WIDTH_TO_HEIGHT_RATIO;

        return (
            <div className="card-wrapper" key={`wizard-position-wrapper-${card.id}`}>
                <div
                    className="wizard-position"
                    style={{
                        height: `${cardHeight}px`,
                    }}
                >
                    {card.index !== null && player.position === card.index && renderWizardCard(player.orientation)}
                </div>
            </div>
        );
    }

    if (!gameState) {
        return (
            <div>
                Loading game...
            </div>
        );
    }

    const {
        cards,
        players,
    } = gameState;

    const codexCard = cards.find(c => !c.playerId && c.index === null);
    const continuumCards = cards
        .filter(c => !c.playerId && c.index !== null)
        .sort((cardA, cardB) => cardA.index - cardB.index) ?? [];
    const player = players.find(p => p.userId === auth.userId);
    const opponent = players.find(p => p.userId !== auth.userId);
    const playerCards = cards.filter(c => c.playerId === player.id) ?? [];
    const opponentCards = cards.filter(c => c.playerId && c.playerId !== opponent.id) ?? [];

    continuumCards.unshift(codexCard);

    return (
        <div className="game">
            {renderPlayerArea(opponent, opponentCards, true)}
            <div className="board">
                <div className="wizard-positions">
                    {continuumCards.map((card) => renderWizardPosition(opponent, card))}
                </div>
                <div className="continuum-cards" ref={continuumRef}>
                    {continuumCards.map((card) => renderCard(card))}
                </div>
                <div className="wizard-positions">
                    {continuumCards.map((card) => renderWizardPosition(player, card))}
                </div>
            </div>
            {renderPlayerArea(player, playerCards)}
        </div>
    );
}
