
import { Card } from '../Card/Card';
import { CardImage } from '../CardImage/CardImage';
import { PlayerLabel } from '../PlayerLabel/PlayerLabel';
import { IPlayerAreaProps } from './PlayerArea-types';
import { genWizardPositionCode } from '../../helpers/helpers';

export function PlayerArea({
    actions,
    activeCodexColor,
    activePlayerId,
    cards,
    isOpponent = false,
    onSelectCard,
    player,
    selectedCard,
}: IPlayerAreaProps): JSX.Element {

    return (
        <div className={`player-area ${player.orientation} ${isOpponent ? 'opponent' : 'player'}`}>
            <div className="player-cards">
                {cards.map((card) =>
                    <Card
                        card={card}
                        actions={actions}
                        selectedCard={selectedCard}
                        activeCodexColor={activeCodexColor}
                        onSelectCard={onSelectCard}
                    />
                )}
            </div>
            <PlayerLabel player={player} activePlayerId={activePlayerId}/>
            {!player.position &&
                <CardImage cardCode={genWizardPositionCode(player)} />
            }
        </div>
    );
}
