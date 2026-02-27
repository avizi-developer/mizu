import {BasicCardSchema, CustomCardSchema, HtmlRawString} from "../types/card/CardSchema";
import {Card} from "./Card";
import {basicCardTemplate, CardTemplate} from "./CardTemplate";
import {CardType, CardTypeToSchemaMap} from "./CardType";

/**
 *
 * @param cardType
 * @param fields
 * @param customCardTemplate - If the given `cardType` is `CardType.CUSTOM`, then `customCardTemplate` is required.
 */
export async function createCard<T extends CardType>(cardType: T, fields: CardTypeToSchemaMap[T], customCardTemplate?: CardTemplate): Promise<Card<T>> {
    if (cardType === CardType.Basic) {
        return {
            id: 'random', // todo
            fields,
            template: basicCardTemplate,
            due: new Date() // todo
        } as Card<T>;
    } else throw new Error('[CreateCard] Invalid card type given.')
}

export async function createBasicCard(fields: BasicCardSchema) {
    return createCard(CardType.BASIC, fields);
}

export async function createBasicAndReversedCard(front: HtmlRawString, back: HtmlRawString) {
    return createCard(CardType.BasicAndReversed, {front, back});
}

export async function createClozeCard(front: HtmlRawString, text: HtmlRawString, extraText: HtmlRawString) {
    return createCard<CardType.Cloze>({front, back: {text, extraText}});
}

export async function createImageOcclusionCard(front: HtmlRawString, back: HtmlRawString) {
    return createCard<CardType.ImageOcclusion>({front, back})
}

export async function createCardFromCustomType(values: CustomCardSchema) {
    return createCard<CardType.Custom>(values);
}

export async function modifyCard(cardId: string) {
    // todo
}

export async function deleteCard(cardId: string) {
    // todo - make sure to delete associated media
}