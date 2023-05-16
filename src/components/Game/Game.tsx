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
import logo from '../../assets/antinomy_logo_b.png';

const CARD_WIDTH_TO_HEIGHT_RATIO = 0.7374301676;

export function Game(_props: IGameProps): JSX.Element {
    const { id: gameId } = useParams();
    const [ gameState, setGameState ] = useState<IGameState>(null);
    const [ actions, setActions ] = useState<IActionPayload[]>([]);
    const [ continuumWidth, setContinuumWidth ] = useState(0);
    const [ selectedCard, setSelectedCard ] = useState(null);
    const [ submitting, setSubmitting ] = useState(false);
    const [ wizardTransition, setWizardTransition ] = useState(0);
    const auth = useSelector<IRootReducer>((state) => state.auth) as IAuthReducer;
    const continuumRef = useRef(null);

    const onWindowReize = () => {
        setContinuumWidth(continuumRef.current?.offsetWidth ?? 0);
    }

    useEffect(() => {
        const getGameState = async () => {
            const response = await GameResource.getState(parseInt(gameId, 10));
            const nextGameState = await response.json();
            let timeout = 0;

            if (gameState && nextGameState) {
                timeout = 1000;
                const activePlayerId = gameState?.activePlayerId;
                const prevPosition = gameState?.players.find(p =>  p.id === activePlayerId)?.position;
                const nextPosition = nextGameState?.players.find(p => p.id === activePlayerId)?.position;

                if (prevPosition !== null && nextPosition !== null && prevPosition !== nextPosition) {
                    const prevPositionElement = document.querySelector(`.wizard-positions .card-wrapper:nth-of-type(${prevPosition})`).getBoundingClientRect();
                    const nextPositionElement = document.querySelector(`.wizard-positions .card-wrapper:nth-of-type(${nextPosition})`).getBoundingClientRect();
                    const transition = nextPositionElement.left - prevPositionElement.left + (prevPositionElement.width / 2);

                    console.log('transition', transition);
                    setWizardTransition(transition);
                }
            }

            setTimeout(async () => {
                setGameState(nextGameState);
                setWizardTransition(null);
            }, timeout);
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
    }, [gameId]);

    useEffect(() => {
        if (continuumRef.current && continuumWidth !== continuumRef.current?.offsetWidth) {
            setContinuumWidth(continuumRef.current.offsetWidth);
        }
    }, [gameState, continuumWidth]);

    const capitalize = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const formatCardCode = (type: ICardType): string => {
        return `${type.color}${type.value}${capitalize(type.suit)}`;
    }

    const renderWizardCard = (player: IPlayer) =>  {
        const isActivePlayer = player.id === gameState.activePlayerId;

        return (
            <Card
                cardCode={`wizard${capitalize(player.orientation)}`}
                transition={isActivePlayer ? wizardTransition : null}
            />
        );
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
                <div className="info-group">
                    <div className="label">
                        {player.user.username}
                    </div>
                    <div className="horizontal-divider"></div>
                    <div className="score">
                        Score: {player.points}
                    </div>
                </div>
                <div className="turn-indicator-wrapper">
                    <div className={`turn-indicator ${isActivePlayer ? 'active' : 'inactive'}`}>
                    </div>
                </div>
            </div>
        );
    }

    const renderPlayerArea = (player: IPlayer, cards: ICard[], isOpponent: boolean = false) => {
        return (
            <div className={`player-area ${player.orientation} ${isOpponent ? 'opponent' : 'player'}`}>
                <div className="player-cards">
                    {!isOpponent && renderPlayerLabel(player)}
                    {!isOpponent && player.position === null && renderWizardCard(player)}
                    {cards.map((card) => renderCard(card, isOpponent))}
                    {isOpponent && player.position === null && renderWizardCard(player)}
                    {isOpponent && renderPlayerLabel(player)}
                </div>
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

    const sendAction = async (_: React.MouseEvent<HTMLElement>, action:  IActionPayload) => {
        if (submitting) {
            return;
        }

        setSubmitting(true);;

        try {
            await GameResource.sendAction(gameState.id, action);
        } catch {
            setSubmitting(false);
        }

        setSubmitting(false);
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
            case GamePhase.MOVEMENT:
                label = 'Move';
                break;
        }

        return  (
            <div className="action-label">
                {label}
            </div>
        );
    }

    const renderWizardPosition = (player: IPlayer, card: ICard, showActions: boolean = false) => {
        const cardAction = getCardAction(card);
        const wizardInPosition = card.index !== null && player.position === card.index;

        return (
            <div
                className={`card-wrapper ${cardAction ? 'is-active' : ''}`}
                key={`wizard-position-wrapper-${card.id}`}
                onClick={(event) => cardAction ? sendAction(event, cardAction) : null}
            >
                <div className="wizard-position">
                    {wizardInPosition && renderWizardCard(player)}
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
    const cardWidth = continuumWidth * .1;
    const cardHeight = cardWidth / CARD_WIDTH_TO_HEIGHT_RATIO;

    continuumCards.unshift(codexCard);

    if (player.orientation === PlayerOrientation.INVERSE) {
        continuumCards.reverse();
    }

    return (
        <div className={`game ${gameState.phase}`}>
            <div className="back-btn-wrapper">
                <Link to="/rooms" className="back-btn">
                    <FontAwesomeIcon icon={solid('arrow-left')} />
                </Link>
            </div>
            {renderPlayerArea(opponent, opponentCards, true)}
            <div className="board">
                <div
                    className="wizard-positions opponent"
                    style={{
                        height: `${cardHeight}px`
                    }}
                >
                    {continuumCards.map((card) => renderWizardPosition(opponent, card))}
                </div>
                <div className="continuum-cards" ref={continuumRef}>
                    {continuumCards.map((card) => renderCard(card))}
                </div>
                <div
                    className="wizard-positions player"
                    style={{
                        height: `${cardHeight}px`
                    }}
                >
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
            <div className="logo-wrapper">
                <img
                    className="logo"
                    src={logo}
                    alt="Antinomy Logo"
                    title="Antinomy Logo"
                />
            </div>
        </div>
    );
}
