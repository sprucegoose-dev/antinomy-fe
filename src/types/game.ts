import { Color, ICard } from "./card";
import { IPlayer } from "./player";

export enum GameState {
    CANCELLED = 'cancelled',
    CREATED = 'created',
    ENDED = 'ended',
    SETUP = 'setup',
    STARTED = 'started',
}

export enum GamePhase {
    DEPLOYMENT = 'deployment',
    MOVEMENT = 'movement',
    COMBAT = 'combat',
    REPLACEMENT = 'replacement',
}

export interface IGameState {
    id: number;
    activePlayerId: number;
    codexColor: Color;
    createdAt: string;
    creatorId: number;
    phase: GamePhase;
    players: IPlayer[];
    state: GameState;
    updatedAt : string;
    winnerId: number;
    cards: ICard[];
}
