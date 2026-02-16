import {
    BasicAndReversedCardSchema,
    BasicCardSchema,
    ClozeCardSchema,
    CustomCardSchema,
    ImageOcclusionCardSchema
} from "./CardSchema";

export enum CardType {
    Basic = 'Basic',
    BasicAndReversed = 'BasicAndReversed',
    Cloze = 'Cloze',
    ImageOcclusion = 'ImageOcclusion',
    Custom = 'Custom'
}

export interface CardTypeToSchemaMap {
    [CardType.Basic]: BasicCardSchema,
    [CardType.BasicAndReversed]: BasicAndReversedCardSchema,
    [CardType.Cloze]: ClozeCardSchema,
    [CardType.ImageOcclusion]: ImageOcclusionCardSchema,
    [CardType.Custom]: CustomCardSchema
}