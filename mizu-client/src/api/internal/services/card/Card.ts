import {basicCardTemplate, CardTemplate} from "./CardTemplate";
import {CardType, CardTypeToSchemaMap} from "./CardType";

export type AnyCard = CardType extends any ? Card<CardType> : never;

export interface Card<T extends CardType> {
    id: string;
    fields: CardTypeToSchemaMap[T];
    template: CardTemplate

    due: Date
    // todo: more scheduling stuff?
}

export enum CardSide {
    FRONT = 'FRONT',
    BACK = 'BACK'
}

export function renderCardSideToHtml(card: AnyCard, side: CardSide) {
    let compiledTemplate;
    if (side === CardSide.FRONT) {
        compiledTemplate = card.template.frontHtmlTemplateCompiled;
    } else if (side === CardSide.BACK) {
        compiledTemplate = card.template.backHtmlTemplateCompiled;
    } else throw new Error('[RenderCardSideToHtml] Invalid card side given.');

    // Insert the fields into the template.
    return compiledTemplate(card.fields);
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
 * @param customCardTemplate - If the given `cardType` is `CardType.Custom`, then `customCardTemplate` is required.
 */
export async function createCard<T extends CardType>(cardType: T, fields: CardTypeToSchemaMap[T], customCardTemplate?: CardTemplate): Promise<Card<T>> {
    // todo custom card template param - probably better to just use template id lookup
    if (customCardTemplate && cardType !== CardType.Custom) {
        throw new Error('[CreateCard] Card type is not custom, but custom card template was given. ')
    }

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