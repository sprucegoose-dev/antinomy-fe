import { ICard } from '../../types/card.interface';
import { GamePhase } from '../../types/game.interface';
import { CardImage } from '../CardImage/CardImage';
import { IWizardPositionProps } from './WizardPosition-types';
import { useState } from 'react';
import { genWizardPositionCode } from '../../helpers/helpers';

export function WizardPosition(props: IWizardPositionProps): JSX.Element {
    const {
        actions,
        activePlayerId,
        card,
        gamePhase,
        player,
        selectedCard,
        onSendAction,
        showActions,
    } = props;

    const [
        wizardTransition,
        // setWizardTransition,
    ] = useState(null);

    const getCardAction = (card: ICard) => {
        switch (gamePhase) {
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

    const cardAction = getCardAction(card);
    const classes = `card-wrapper ${cardAction ? 'is-active' : ''}`;
    const key = `wizard-position-wrapper-${card.id}`;
    const onClick = (event) => cardAction ? onSendAction(event, cardAction) : null;
    const wizardInPosition = card.index !== null && player.position === card.index;
    const isActivePlayer = player.id === activePlayerId;

    return (
        <div className={classes} key={key} onClick={onClick}>
             {wizardInPosition &&
                <div className={`${wizardInPosition ? 'wizard-position' : ''}`}>
                    <CardImage
                        cardCode={genWizardPositionCode(player)}
                        transition={isActivePlayer ? wizardTransition : null}
                    />
                </div>
            }
            {showActions && cardAction ?
                renderActionLabel(gamePhase)
                : null
            }
        </div>
    );
}
