import { toast } from 'react-toastify';

import GameResource from '../../resources/GameResource';
import './CreateGameForm.scss';


export function CreateGameForm(): JSX.Element {
    const onSubmit = async () => {
        const response = await GameResource.create();
        if (response.ok) {
            toast.success('Game created successfully');
        } else {
            toast.error('Error creating game');
        }
    }

    return (
        <div className="create-room-form">
            <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={onSubmit}
            >
                Create Game
            </button>
        </div>
    );
}
