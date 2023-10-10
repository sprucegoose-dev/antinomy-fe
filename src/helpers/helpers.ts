import { capitalize } from '@mui/material';
import { IPlayer } from '../types/player.interface';

export function genWizardPositionCode(player: IPlayer) {
    return `wizard${capitalize(player.orientation)}`;
}
