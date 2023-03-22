import './Home.scss';

import logo from '../../assets/antinomy_logo_b.png';
import screenshot from '../../assets/antinomy_screenshot.png';
import { Link } from 'react-router-dom';

export function Home(): JSX.Element {
    return (
        <div className="home">
            <div className="logo-wrapper">
                <img
                    className="logo"
                    src={logo}
                    alt="Antinomy Logo"
                    title="Antinomy Logo"
                />
            </div>
            <div className="intro">
                <p>
                    Antinomy is a 2-player card game where two sorcerers compete to collect sets of relics across space and time and create Paradoxes.
                    The first player to create five Paradoxes wins the game.
                </p>
                <p>
                    The game was designed by John Baluci and published
                        by <a href="https://buttonshygames.com/" target="_blank" className="link-primary" rel="noreferrer">Button Shy Games</a> in 2019.
                </p>
                <p>
                    <strong>Antinomy Online</strong> is an unofficial fan-made adaptation of the game.
                    It's completely free to play. All you need to do is
                       <Link to="/login/signUp" className="link-primary">
                            &nbsp;create an account&nbsp;
                        </Link>
                    and you can start playing.
                </p>
            </div>
            <div className="screenshot-wrapper">
                <img
                    className="screenshot"
                    src={screenshot}
                    alt="Antinomy Screenshot"
                    title="The setup for a game of Antinomy"
                />
                <div className="caption">
                    A game of Antinomy in progress.
                </div>
            </div>

        </div>
    );
}
