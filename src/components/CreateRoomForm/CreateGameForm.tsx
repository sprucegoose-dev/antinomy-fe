import { toast } from 'react-toastify';

import GameResource from '../../resources/GameResource';
import './CreateGameForm.scss';


export function CreateGameForm(): JSX.Element {
    const onSubmit = async () => {
        const response = await GameResource.create();

        const data = await response.json();

        if (response.ok) {
            toast.success('Game created successfully');
        } else {
            if (data.code === 401) {
                toast.error('You must be signed in to create a game.');
            } else if (data.code === 400) {
                toast.error(data.message);
            } else {
                toast.error('Error creating game');
            }
        }
    }

    return (
        <div className="create-game-form">
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
