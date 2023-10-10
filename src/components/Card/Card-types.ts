import { Color, ICard } from "../../types/card.interface";
import { IActionPayload } from "../../types/game.interface";

export interface ICardProps {
    card: ICard;
    actions: IActionPayload[];
    selectedCard: ICard;
    activeCodexColor: Color;
    isHidden?: boolean;
    onSelectCard: (card: ICard) => void;
}
