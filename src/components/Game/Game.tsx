import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import GameResource from '../../resources/GameResource';
import { socket } from '../../socket';
import { IRootReducer } from '../../store/reducers-types';
import { ICard, ICardType } from '../../types/card.interface';
import { GamePhase, GameState, IActionPayload, IGameState } from '../../types/game.interface';
import { IPlayer, PlayerOrientation } from '../../types/player.interface';
import { IAuthReducer } from '../Auth/Auth-types';
import { Card } from '../Card/Card';
import { IGameProps } from './Game-types';
import './Game.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' ;

const CARD_WIDTH_TO_HEIGHT_RATIO = 0.7374301676;

export function Game(_props: IGameProps): JSX.Element {
    const { id: gameId } = useParams();
    const [ gameState, setGameState ] = useState<IGameState>(null);
    const [ actions, setActions ] = useState<IActionPayload[]>([]);
    const [ continuumWidth, setContinuumWidth ] = useState(0);
    const [ selectedCard, setSelectedCard ] = useState(null);
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

        window.addEventListener('resize', onWindowReize);

        socket.emit('onJoinGame', gameId);
        socket.on('onUpdateGameState', getUpdatedGameState);

        return () => {
            window.removeEventListener('resize', onWindowReize);
            socket.emit('onLeaveGame', gameId);
            socket.off('onUpdateGameState', getUpdatedGameState);
        }
    }, []);

    useEffect(() => {
        if (continuumRef.current && continuumWidth !== continuumRef.current?.offsetWidth) {
            setContinuumWidth(continuumRef.current.offsetWidth);
        }
    }, [gameState]);

    const capitalize = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const formatCardCode = (type: ICardType): string => {
        return `${type.color}${type.value}${capitalize(type.suit)}`;
    }

    const renderWizardCard = (orientation: PlayerOrientation) =>  {
        return <Card cardCode={`wizard${capitalize(orientation)}`} />;
    }

    const selectCard = (card: ICard) => {
        if (selectedCard?.id === card.id) {
            setSelectedCard(null);
        } else {
            setSelectedCard(card);
        }
    }

    const renderCard = (card: ICard, isHidden: boolean = false) => {
        const isCodexCard = card.index === null && !card.playerId;
        const cardCode = isCodexCard || isHidden ?
            'cardBack' :
            formatCardCode(card.type);
        const cardActions = actions.find(a => a.sourceCardId === card.id);
        const isSelected = selectedCard?.id === card.id;

        return (
            <div
                className={`card-wrapper ${cardActions ? 'is-selectable' : ''} ${isSelected ? 'is-selected' : ''}`}
                key={`card-${card.id}`}
                onClick={() => cardActions ? selectCard(card) : null}
            >
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
            <div className={`player-area ${player.orientation} ${isOpponent ? 'opponent' : 'player'}`}>
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

    const getCardAction = (card: ICard) => {
        switch (gameState.phase) {
            case GamePhase.REPLACEMENT:
            case GamePhase.DEPLOYMENT:
                return actions.find(action => action.targetIndex === card.index);
            case GamePhase.MOVEMENT:
                return actions.filter(action =>
                    action.sourceCardId === selectedCard?.id
                ).find(action =>
                    action.targetIndex === card.index
                );
        }
    }

    const sendAction = async (action:  IActionPayload) => {
        await GameResource.sendAction(gameState.id, action);
    }

    const renderActionLabel = (gamePhase: GamePhase) => {
        let label = '';

        switch (gamePhase) {
            case GamePhase.DEPLOYMENT:
                label = 'Start here';
                break;
            case GamePhase.REPLACEMENT:
                label = 'Swap';
                break;
        }

        return  (
            <div className="action-label">
                {label}
            </div>
        );
    }

    const renderWizardPosition = (player: IPlayer, card: ICard, showActions: boolean = false) => {
        const cardWidth = continuumWidth * .1;
        const cardHeight = cardWidth / CARD_WIDTH_TO_HEIGHT_RATIO;
        const cardAction = getCardAction(card);

        return (
            <div
                className={`card-wrapper ${cardAction ? 'is-active' : ''}`}
                key={`wizard-position-wrapper-${card.id}`}
                onClick={() => cardAction ? sendAction(cardAction) : null}
            >
                <div
                    className="wizard-position"
                    style={{
                        height: `${cardHeight}px`,
                    }}
                >
                    {card.index !== null && player.position === card.index && renderWizardCard(player.orientation)}
                </div>
                {showActions && cardAction ?
                    renderActionLabel(gameState.phase)
                    : null
                }
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
    const winner = players.find(p => p.userId === gameState.winnerId);

    continuumCards.unshift(codexCard);

    if (player.orientation === PlayerOrientation.INVERSE) {
        continuumCards.reverse();
    }

    return (
        <div className={`game ${gameState.phase}`}>
            <div className="logo-wrapper">
                <Link to="/rooms" className="back-btn">
                    <FontAwesomeIcon icon={solid('arrow-left')} />
                </Link>
            </div>
            {renderPlayerArea(opponent, opponentCards, true)}
            <div className="board">
                <div className="wizard-positions opponent">
                    {continuumCards.map((card) => renderWizardPosition(opponent, card))}
                </div>
                <div className="continuum-cards" ref={continuumRef}>
                    {continuumCards.map((card) => renderCard(card))}
                </div>
                <div className="wizard-positions player">
                    {continuumCards.map((card) => renderWizardPosition(player, card, true))}
                </div>
            </div>
            {renderPlayerArea(player, playerCards)}
            {
                gameState.state === GameState.ENDED && winner &&
                    <div className={`victory-modal ${winner.id === player.id ? 'victory' : 'defeat'}`}>
                        <div className="title">
                            {winner.id === player.id ? 'Victory!' : 'Defeat!'}
                        </div>
                        <div className="content">
                            {winner.user.username} has won the match.
                        </div>
                    </div>
            }
        </div>
    );
}
