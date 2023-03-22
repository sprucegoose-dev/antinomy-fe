import './Footer.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export function Footer(): JSX.Element {
    return (
        <div className="footer">
            <div className="copyrights">
                <span className="copyrights-label">
                    &copy; {moment().format('YYYY')} Morgan Polak
                </span>
                <Link to="/contact-us" className="contact-us-link link-tertiary">
                    <FontAwesomeIcon className="contact-us-icon" icon={faEnvelope}/>
                </Link>
            </div>
            <div className="disclaimer">
                The Antinomy title, logo, concept, rules, and card graphics,
                are the intellectual property of Button Shy Games and the game creator,
                John Baluci.
            </div>
        </div>
    );
}
