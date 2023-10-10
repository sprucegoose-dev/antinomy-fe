import { ICard } from '../../types/card.interface';
import { GamePhase, IActionPayload } from '../../types/game.interface';
import { IPlayer } from '../../types/player.interface';

export interface IWizardPositionProps {
    actions: IActionPayload[];
    activePlayerId: number;
    card: ICard;
    gamePhase: GamePhase;
    player: IPlayer;
    selectedCard: ICard;
    onSendAction: (_: React.MouseEvent<HTMLElement>, action:  IActionPayload) => void;
    showActions: boolean;
}
