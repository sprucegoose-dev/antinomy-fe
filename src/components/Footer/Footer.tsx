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
                The War Chest title, logo, concept, rules, unit coin graphics, and card descriptions,
                are the intellectual property of Alderac Entertainment Group and the game creators,
                Trevor Benjamin and David Thompson. The visual assets were created by Brigette Indelicato.
            </div>
        </div>
    );
}
