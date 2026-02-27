import * as handlebars from "handlebars";
import {CardType} from "./CardType";

export type TemplateId = string;

/**
 * The template strings are html/css/js that are compatible with handlebars,
 * using double braces, for example {{var1}}, around variables.
 */
export interface CardTemplate {
    id: TemplateId,
    frontHtmlTemplateCompiled: HandlebarsTemplateDelegate;
    backHtmlTemplateCompiled: HandlebarsTemplateDelegate;
}

// todo will be loaded from folder
const allCardTemplates: Map<TemplateId, CardTemplate> = new Map();

export function createCardTemplate(templateId: TemplateId, frontHtmlTemplateString: string, backHtmlTemplateString: string) {
    if (allCardTemplates.has(templateId)) {
        throw new Error('[CreateCardTemplate] Card template with given id already exists.')
    }

    const cardTemplate: CardTemplate = {
        id: templateId,
        frontHtmlTemplateCompiled: handlebars.compile(frontHtmlTemplateString),
        backHtmlTemplateCompiled: handlebars.compile(backHtmlTemplateString)
    };

    allCardTemplates.set(templateId, cardTemplate);
    return cardTemplate;
}

export function getAllCardTemplates() {
    return Array.from(allCardTemplates.values());
}

export function getCardTemplate(templateId: TemplateId) {
    return allCardTemplates.get(templateId);
}

export function modifyCardTemplate(templateId: TemplateId, frontHtmlTemplateString: string, backHtmlTemplateString: string) {
    if (!allCardTemplates.has(templateId)) {
        throw new Error('[ModifyCardTemplate] Card template with given id does not exist.')
    }

    deleteCardTemplate(templateId);
    return createCardTemplate(templateId, frontHtmlTemplateString, backHtmlTemplateString)
}

export function deleteCardTemplate(templateId: TemplateId) {
    return allCardTemplates.delete(templateId);
}

export function createBasicCardTemplate() {
    const basicCardFrontHtmlTemplateString: string = `
        <div>{{front}}</div>
    `;

    const basicCardBackHtmlTemplateString: string = `
        <div>{{front}}</div>
        <hr/>
        <div>{{back}}</div>
    `;

    return createCardTemplate(CardType.Basic, basicCardFrontHtmlTemplateString, basicCardBackHtmlTemplateString);
}


export const basicCardTemplate: CardTemplate = createBasicCardTemplate();

// todo - rest of card types

