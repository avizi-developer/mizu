import {CardTemplate} from "./CardTemplate";
import {CardType, CardTypeToSchemaMap} from "./CardType";
import * as handlebars from "handlebars";

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