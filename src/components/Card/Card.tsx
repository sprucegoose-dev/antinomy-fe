
import { capitalize } from '@mui/material';
import { ICardType } from '../../types/card.interface';
import { CardImage } from '../CardImage/CardImage';
import { ICardProps } from './Card-types';

const formatCardCode = (type: ICardType): string => {
    return `${type.color}${type.value}${capitalize(type.suit)}`;
}

export function Card({
    card,
    actions,
    selectedCard,
    activeCodexColor,
    isHidden = false,
    onSelectCard
}: ICardProps): JSX.Element {
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
            onClick={() => cardActions ? onSelectCard(card) : null}
        >
            <CardImage cardCode={cardCode} />
            {isCodexCard ?
                <span className={`codex-ring ${activeCodexColor}`} />
                : null
            }
        </div>
    );
}
