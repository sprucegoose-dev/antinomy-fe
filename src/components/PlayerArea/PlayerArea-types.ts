import { Color, ICard } from '../../types/card.interface';
import { IActionPayload } from '../../types/game.interface';
import { IPlayer } from '../../types/player.interface';

export interface IPlayerAreaProps {
    actions: IActionPayload[];
    activeCodexColor: Color;
    activePlayerId: number;
    cards: ICard[];
    isOpponent?: boolean;
    onSelectCard: (card: ICard) => void;
    player: IPlayer;
    selectedCard: ICard;
}
