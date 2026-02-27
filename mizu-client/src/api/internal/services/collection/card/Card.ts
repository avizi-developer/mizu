import {
    basicCardTemplate,
    basicCardTemplateId,
    CardTemplate, CardTemplateCompiled,
    doesCardTemplateExist,
    getCardTemplate, getCardTemplateCompiled,
    TemplateId
} from "./CardTemplate";
import {CardType, CardTypeToSchemaMap} from "./CardType";
import {
    BasicAndReversedCardSchema,
    BasicCardSchema,
    ClozeCardSchema,
    CustomCardSchema,
    ImageOcclusionCardSchema
} from "./CardSchema";

export type AnyCard = CardType extends any ? Card<CardType> : never;

export interface Card<T extends CardType> {
    id: string;
    fields: CardTypeToSchemaMap[T];
    templateId: TemplateId,

    due: Date
    // todo: more scheduling stuff?
}

export enum CardSide {
    FRONT = 'FRONT',
    BACK = 'BACK'
}

export function renderCardSideToHtml(card: AnyCard, side: CardSide) {
    const cardTemplateCompiled: CardTemplateCompiled | undefined = getCardTemplateCompiled(card.templateId);
    if (!cardTemplateCompiled) {
        throw new Error('[RenderCardSideToHtml] Card template does not exist.')
    }

    let sidedCompiledTemplate;
    if (side === CardSide.FRONT) {
        sidedCompiledTemplate = cardTemplateCompiled.frontCompiledTemplate;
    } else if (side === CardSide.BACK) {
        sidedCompiledTemplate = cardTemplateCompiled.backCompiledTemplate;
    } else throw new Error('[RenderCardSideToHtml] Invalid card side given.');

    // Insert the fields into the template.
    return sidedCompiledTemplate(card.fields);
}

export function renderCardFrontToHtml(card: AnyCard): string {
    return renderCardSideToHtml(card, CardSide.FRONT);
}

export function renderCardBackToHtml(card: AnyCard): string {
    return renderCardSideToHtml(card, CardSide.BACK);
}

/**
 *
 * @param cardType
 * @param fields
 * @param templateId - If the given `cardType` is `CardType.Custom`, then `templateId` is required in order
 * to find the right template to use. Otherwise, the given card type will just use its known template. For example,
 * the basic card type always uses the basic card template.
 */
export async function createCard<T extends CardType>(cardType: T, fields: CardTypeToSchemaMap[T], templateId?: TemplateId): Promise<Card<T>> {
    // Verify that templateId was given if card type is custom; param is otherwise ignored.
    if (cardType === CardType.Custom && !templateId) {
        throw new Error('[CreateCard] Card type is custom, but template id was not given.')
    }

    // todo: when creating cards below must persist to db.
    if (cardType === CardType.Basic) {
        return {
            id: 'random', // todo
            fields,
            templateId: basicCardTemplateId,
            due: new Date() // todo
        } as Card<T>;
    }

    else if (cardType === CardType.Custom) {
        // Verify that templateId exists.
        if (!doesCardTemplateExist(templateId!)) {
            throw new Error('[CreateCard] Card template with given id does not exist.')
        }

        return {
            id: 'random', // todo
            fields,
            templateId: templateId,
            due: new Date() // todo
        } as Card<T>
    }
        // todo: other card types
    else throw new Error('[CreateCard] Invalid card type given.')
}

export async function createBasicCard(fields: BasicCardSchema) {
    return createCard(CardType.Basic, fields);
}

export async function createBasicAndReversedCard(fields: BasicAndReversedCardSchema) {
    return createCard(CardType.BasicAndReversed, fields);
}

export async function createClozeCard(fields: ClozeCardSchema) {
    return createCard(CardType.Cloze, fields);
}

export async function createImageOcclusionCard(fields: ImageOcclusionCardSchema) {
    return createCard(CardType.ImageOcclusion, fields);
}

export async function createCardFromCustomType(fields: CustomCardSchema) {
    return createCard(CardType.Custom, fields);
}

export async function modifyCard(cardId: string) {
    // todo
}

export async function deleteCard(cardId: string) {
    // todo - make sure to delete associated media
}