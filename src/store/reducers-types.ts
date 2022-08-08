import { IAppReducer } from '../App-types';
import { IAuthReducer } from '../components/Auth/Auth-types';

export interface IRootReducer {
    app: IAppReducer;
    auth: IAuthReducer;
}
