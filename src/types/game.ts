import { IPlayer } from "./player";

export enum Suit {
    FEATHER = 'feather',
    KEY = 'key',
    RING = 'ring',
    SKULL = 'skull',
}

export enum Color {
    RED = 'red',
    PURPLE = 'purple',
    GREEN = 'green',
    BLUE = 'blue',
}

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
}
