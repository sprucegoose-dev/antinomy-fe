import './Rules.scss';

export function Rules(): JSX.Element {
    return (
        <div className="rules">
            <div className="title">
                Rules
            </div>
            <div className="subtitle">
                Setup
            </div>
            <div className="content">
                <ul>
                    <li>
                        Deal 3 Relic cards face down to each player.
                    </li>
                    <li>
                        Deal 9 Relic cards face up in a straight line between the two players to form the Continuum.
                    </li>
                    <li>
                        Place the last Relic card face down at the end of the Continuum - this is the Codex.
                    </li>
                    <li>
                        Place 1 Paradox Crystal (marked as a circle on the website) on the
                         Codex color that matches the card at the other end of the Continuum.
                    </li>
                    <li>
                        Deal 1 Sorcerer card to each player.
                    </li>
                    <li>
                        Choose a starting player at random.
                    </li>
                    <li>
                        In turn order, each player places their Sorcerer card below a card on the
                         Continuum that matches the Codex color.
                    </li>
                </ul>
            </div>
            <div className="subtitle">
                Gameplay
            </div>
            <div className="content">
                <ul>
                    <li>
                        Select a card from your hand.
                    </li>
                    <li>
                        Use the <b>value</b> (number) of the card to move your Sorcerer that many
                         spaces to the <b>right</b> (forward in time).
                    </li>
                    <li>
                        Use the <b>color</b> or <b>suit</b> (symbol) of your card to move your Sorcerer to any
                         card on the <b>left</b> with a matching <b>color</b>/<b>suit</b> (backward in time).
                    </li>
                    <li>
                        Swap the card from your hand with the card from the Contiuum at your Sorcerer's final position.
                    </li>
                </ul>
            </div>
            <div className="subtitle">
                Declaring a Paradox
            </div>
            <div className="content">
                <ul>
                    <li>
                        After collecting a card from the Continuum, check to see if you have a matching set.
                    </li>
                    <li>
                        In order to have a matching set, all three cards in your hand must have the same <b>number</b>, <b>color</b>, or <b>suit</b>
                        , <i>and none of them belong to the Codex color.</i>
                    </li>
                    <li>
                        If you have a valid matching set (called a Paradox), gain <b>1 point</b>, <b>advance the Codex color clockwise</b> to the next color,
                        and <b>swap your cards with 3 cards from the Continuum</b> to the left or right (if possible).
                    </li>
                </ul>
            </div>
            <div className="subtitle">
                Combat
            </div>
            <div className="content">
                <ul>
                    <li>
                        If your Sorcerer ends its movement on the same card as the other Sorcerer, combat begins.
                    </li>
                    <li>
                       Players compare the cards in their hand, and the player with the highest total value
                        wins. <i>Cards in the active Codex color are ignored.</i>
                    </li>
                    <li>
                        In case of a tie, players shuffle their cards, and randomly reveal one card at a time. The card with the
                         higher value wins.
                    </li>
                    <li>
                        In case there is still a tie, nothing happens.
                    </li>
                    <li>
                        If there is a winner, they <b>gain 1 point</b>, and their <b>opponent loses 1 point</b>. The winner can <i>only gain
                         a point if their opponent had a point to lose.</i>
                    </li>
                    <li>
                        If a point had been gained, advance the Codex color clockwise to the next color.
                    </li>
                </ul>
            </div>
            <div className="subtitle">
                Wining the Game
            </div>
            <div className="content">
                <ul>
                    <li>
                        The first player to 5 points wins the game.
                    </li>
                </ul>
            </div>
        </div>
    );
}
