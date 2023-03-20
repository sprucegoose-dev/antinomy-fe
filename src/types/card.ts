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

export interface ICardType {
    id: number;
    value: number;
    suit: Suit;
    color: Color;
}

export interface ICard {
    cardTypeId: number;
    gameId: number;
    id: number;
    index: number;
    playerId: number;
    type: ICardType;
}
