import { IUser } from "./user.interface";

export enum PlayerOrientation {
    TOP = 'top',
    BOTTOM = 'top',
}

export interface IPlayer {
    id: number;
    userId: number;
    gameId: number;
    position: number;
    points: number;
    orientation: PlayerOrientation;
    user: IUser;
}
