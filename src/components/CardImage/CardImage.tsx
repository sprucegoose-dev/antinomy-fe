import blue1Skull from '../../assets/cards/blue_1_skull.png';
import blue2Ring from '../../assets/cards/blue_2_ring.png';
import blue3Feather from '../../assets/cards/blue_3_feather.png';
import blue4Key from '../../assets/cards/blue_4_key.png';
import green1Feather from '../../assets/cards/green_1_feather.png';
import green2Key from '../../assets/cards/green_2_key.png';
import green3Skull from '../../assets/cards/green_3_skull.png';
import green4Ring from '../../assets/cards/green_4_ring.png';
import purple1Ring from '../../assets/cards/purple_1_ring.png';
import purple2Feather from '../../assets/cards/purple_2_feather.png';
import purple3Key from '../../assets/cards/purple_3_key.png';
import purple4Skull from '../../assets/cards/purple_4_skull.png';
import red1Key from '../../assets/cards/red_1_key.png';
import red2Skull from '../../assets/cards/red_2_skull.png';
import red3Ring from '../../assets/cards/red_3_ring.png';
import red4Feather from '../../assets/cards/red_4_feather.png';
import cardBack from '../../assets/cards/card_back.png';
import wizardDefault from '../../assets/cards/wizard_default.png';
import wizardInverse from '../../assets/cards/wizard_inverse.png';
import { ICardImagerops } from './CardImage-types';

export function CardImage({ cardCode, transition = null}: ICardImagerops): JSX.Element {
    const cards = {
        blue1Skull,
        blue2Ring,
        blue3Feather,
        blue4Key,
        green1Feather,
        green2Key,
        green3Skull,
        green4Ring,
        purple1Ring,
        purple2Feather,
        purple3Key,
        purple4Skull,
        red1Key,
        red2Skull,
        red3Ring,
        red4Feather,
        cardBack,
        wizardDefault,
        wizardInverse
    };

    let customStyles = {};

    if (transition) {
        customStyles = {
            left: `${transition}px`,
        };
    }

    return (
        <img
            src={cards[cardCode]}
            style={customStyles}
            className={`card-img ${cardCode.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
            alt="Card"
            draggable="false"
        />
    );
}
