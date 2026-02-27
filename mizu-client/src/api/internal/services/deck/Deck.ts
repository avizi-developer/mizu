import {AnyCard} from "../card/Card";


/**
 * Represents a collection of cards and nested sub-decks.
 */
export interface Deck {
    id: string;
    displayName: string;
    cards: AnyCard[];
    subDecks: Deck[];
}