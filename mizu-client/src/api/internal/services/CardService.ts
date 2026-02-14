import {CardType, CardTypeToFieldMap} from "../types/card/CardType";
import {
    CardTemplate,
    CardTemplateAny,
    CardTemplateBasic,
    CardTemplateBasicReversed,
    CardTemplateCloze, CardTemplateCustom, CardTemplateImageOcclusion
} from "../types/card/CardTemplate";
import {Card} from "../types/card/Card";

import {MarkdownFieldContent} from "../types/field/FieldContent";

export async function createCard<T extends keyof CardTypeToFieldMap>(
    front: CardTypeToFieldMap[T]['front'],
    back: CardTypeToFieldMap[T]['back']
) {
    // todo create card in db

    return {
        id: '', // todo
        type: CardType,
        front,
        back
    } as Card<T>;
}

export async function createBasicCard(front: MarkdownFieldContent, back: MarkdownFieldContent) {
    return createCard<'basic'>(front, back)
}

export async function createBasicReversedCard(fields: CardTemplateBasicReversed, deckName: string) {
    // todo
}

export async function createClozeCard(fields: CardTemplateCloze, deckName: string) {
    // todo
}

export async function createImageOcclusionCard(fields: CardTemplateImageOcclusion, deckName: string) {
    // todo
}

export async function createCardFromCustomTemplate(fields: CardTemplateCustom, deckName: string) {
    // todo
}

export async function modifyCard(cardId: string) {
    // todo
}

export async function deleteCard(cardId: string) {
    // todo - make sure to delete associated media
}