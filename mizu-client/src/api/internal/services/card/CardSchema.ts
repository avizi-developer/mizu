export type HtmlRawString = string;

/**
 * Card schema represents the fields of the card type.
 */
export interface CardSchema {
    front: unknown;
    back: unknown;
}

export interface BasicCardSchema extends CardSchema {
    front: HtmlRawString;
    back: HtmlRawString;
}

export interface BasicAndReversedCardSchema extends CardSchema {
    front: HtmlRawString;
    back: HtmlRawString;
}

export interface ClozeCardSchema extends CardSchema {
    front: HtmlRawString;
    back: {
        text: HtmlRawString;
        extraText: HtmlRawString;
    }
}

// todo
export interface ImageOcclusionCardSchema extends CardSchema {
    front: HtmlRawString;
    back: HtmlRawString;
}

export type CustomCardSchema = Record<string, string>;
