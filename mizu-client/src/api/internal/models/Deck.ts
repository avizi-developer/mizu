import {AnyCard} from "../card/Card";


/**
 * Represents a collection of cards and nested sub-decks.
 */
export class Deck {
    /**
     * Creates a new Deck instance.
     *
     * @param name - The display name of the deck.
     * @param cards - The list of cards directly contained in this deck.
     * @param subDecks - A collection of child decks nested within this deck.
     */
    constructor(
        public readonly name: string,
        public readonly cards: AnyCard[],
        public readonly subDecks: Deck[],
    ) {
        // todo - create deck, persist to db
    }

    private async persistToDatabase() {
        // todo - interface with database service
    }
}