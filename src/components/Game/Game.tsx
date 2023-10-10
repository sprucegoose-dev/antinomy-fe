import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import GameResource from '../../resources/GameResource';
import { socket } from '../../socket';
import { IRootReducer } from '../../store/reducers-types';
import { ICard } from '../../types/card.interface';
import { GameState, IActionPayload, IGameState } from '../../types/game.interface';
import { PlayerOrientation } from '../../types/player.interface';
import { IAuthReducer } from '../Auth/Auth-types';
import { IGameProps } from './Game-types';
import './Game.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' ;
import logo from '../../assets/antinomy_logo_b.png';
import { Card } from '../Card/Card';
import { PlayerArea } from '../PlayerArea/PlayerArea';
import { WizardPosition } from '../WizardPosition/WizardPosition';

const CARD_WIDTH_TO_HEIGHT_RATIO = 0.7374301676;

export function Game(_props: IGameProps): JSX.Element {
    const { id: gameId } = useParams();
    const [ gameState, setGameState ] = useState<IGameState>(null);
    const [ actions, setActions ] = useState<IActionPayload[]>([]);
    const [ continuumWidth, setContinuumWidth ] = useState(0);
    const [ selectedCard, setSelectedCard ] = useState(null);
    const [ submitting, setSubmitting ] = useState(false);
    const auth = useSelector<IRootReducer>((state) => state.auth) as IAuthReducer;
    const continuumRef = useRef(null);

    const onWindowReize = () => {
        setContinuumWidth(continuumRef.current?.offsetWidth ?? 0);
    }

    const getGameState = async () => {
        const response = await GameResource.getState(parseInt(gameId, 10));
        const state = await response.json();
        setGameState(state);
    }

    const getActions = async () => {
        const response = await GameResource.getActions(parseInt(gameId, 10));
        setActions(await response.json());
    }

    const getUpdatedGameState = async (updatedGameState) => {
        animatePlayerMovement(gameState, updatedGameState);
        setGameState(updatedGameState);
        getActions();
    }

    const animatePlayerMovement = (_prevGameState, _nextGameState) => {
        // const activePlayerId = prevGameState?.activePlayerId;
        // const prevPosition = prevGameState?.players.find(p =>  p.id === activePlayerId)?.position ?? null;
        // const nextPosition = nextGameState?.players.find(p => p.id === activePlayerId)?.position ?? null;

        // if (prevPosition !== null && nextPosition !== null) {
        //     const prevPositionElement = document.querySelector(`.wizard-positions .card-wrapper:nth-of-type(${prevPosition})`).getBoundingClientRect();
        //     const nextPositionElement = document.querySelector(`.wizard-positions .card-wrapper:nth-of-type(${nextPosition})`).getBoundingClientRect();
        //     // const transition = nextPositionElement.left - prevPositionElement.left + (prevPositionElement.width / 2);
        //     // setWizardTransition(transition);

        //     setTimeout(async () => {
        //         // setWizardTransition(null);
        //     }, 1000);
        // }
    }

    useEffect(() => {
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

    const selectCard = (card: ICard) => {
        if (selectedCard?.id === card.id) {
            setSelectedCard(null);
        } else {
            setSelectedCard(card);
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
            <PlayerArea
                actions={actions}
                activeCodexColor={gameState.codexColor}
                activePlayerId={gameState.activePlayerId}
                cards={opponentCards}
                isOpponent={true}
                onSelectCard={selectCard}
                player={opponent}
                selectedCard={selectedCard}
            />
            <div className="board">
                <div
                    className="wizard-positions opponent"
                    style={{
                        height: `${cardHeight}px`
                    }}
                >
                    {continuumCards.map((card) =>
                        <WizardPosition
                            actions={actions}
                            card={card}
                            player={opponent}
                            gamePhase={gameState.phase}
                            activePlayerId={gameState.activePlayerId}
                            selectedCard={selectedCard}
                            showActions={false}
                            onSendAction={sendAction}
                        />
                    )}
                </div>
                <div className="continuum-cards" ref={continuumRef}>
                    {continuumCards.map((card) =>
                        <Card
                            card={card}
                            actions={actions}
                            selectedCard={selectedCard}
                            activeCodexColor={gameState.codexColor}
                            onSelectCard={selectCard}
                        />
                    )}
                </div>
                <div
                    className="wizard-positions player"
                    style={{
                        height: `${cardHeight}px`
                    }}
                >
                    {continuumCards.map((card) =>
                        <WizardPosition
                            actions={actions}
                            card={card}
                            player={player}
                            gamePhase={gameState.phase}
                            activePlayerId={gameState.activePlayerId}
                            selectedCard={selectedCard}
                            showActions={true}
                            onSendAction={sendAction}
                        />
                    )}
                </div>
            </div>
            <PlayerArea
                actions={actions}
                activeCodexColor={gameState.codexColor}
                activePlayerId={gameState.activePlayerId}
                cards={playerCards}
                onSelectCard={selectCard}
                player={player}
                selectedCard={selectedCard}
            />
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
