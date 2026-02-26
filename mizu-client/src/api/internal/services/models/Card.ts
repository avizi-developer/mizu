import {HtmlRawString} from "./CardSchema";
import {CardTemplate} from "./CardTemplate";
import {CardType, CardTypeToSchemaMap} from "./CardType";

export type AnyCard = CardType extends any ? Card<CardType> : never;

export class Card<T extends CardType> {
    constructor(
        public readonly id: string,
        public readonly schema: CardTypeToSchemaMap[T],
        /**
         * HTML template string that can be injected with schema variables from above.
         */
        public readonly template: CardTemplate,
    ) {
    }

    /**
     * Produce the final HTML representation of the card by injecting schema variables
     * into the template.
     *
     * This is a simple template engine that replaces placeholders in the format `{{key}}`
     * with corresponding values from the `schema` object.
     *
     * @returns The rendered HTML as a raw string.
     */
    public render(): HtmlRawString {
        // todo - use handlebars to create rendered html
    }

    // todo: scheduling stuff
}