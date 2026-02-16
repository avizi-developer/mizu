import {BasicCardSchema, CardSchema, CustomCardSchema, HtmlRawString} from "../types/card/CardSchema";
import {CardType, CardTypeToSchemaMap} from "../types/card/CardType";

export async function createCard<T extends CardType>(values: CardTypeToSchemaMap[T]) {
    // todo create card in db
    // todo return card
}

export async function createBasicCard(values: BasicCardSchema) {
    return createCard<CardType.Basic>(values);
}

export async function createBasicAndReversedCard(front: HtmlRawString, back: HtmlRawString) {
    return createCard<CardType.BasicAndReversed>({front, back});
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