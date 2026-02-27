import * as handlebars from "handlebars";
import {CardType} from "./CardType";

export type TemplateId = string;

/**
 * The template strings are html/css/js that are compatible with handlebars,
 * using double braces, for example {{var1}}, around variables.
 */
export interface CardTemplate {
    id: TemplateId,
    frontHtmlTemplateHtmlString: string,
    backHtmlTemplateString: string,
}

interface CompiledTemplate {
    id: TemplateId,
    front: HandlebarsTemplateDelegate,
    back: HandlebarsTemplateDelegate,
}

// todo will be loaded from folder
const allCardTemplates: Map<TemplateId, CardTemplate> = new Map();
const allCardTemplatesCompiled: Map<TemplateId, CompiledTemplate> = new Map();

export function createCardTemplate(templateId: TemplateId, frontHtmlTemplateString: string, backHtmlTemplateString: string) {
    if (allCardTemplates.has(templateId)) {
        throw new Error('[CreateCardTemplate] Card template with given id already exists.')
    }

    const cardTemplate: CardTemplate = {
        id: templateId,
        frontHtmlTemplateHtmlString: frontHtmlTemplateString,
        backHtmlTemplateString: backHtmlTemplateString,
    };

    allCardTemplates.set(templateId, cardTemplate);
    if (!allCardTemplatesCompiled.has(templateId)) {
        allCardTemplatesCompiled.set(templateId, {
            id: templateId,
            front: handlebars.compile(frontHtmlTemplateString),
            back: handlebars.compile(backHtmlTemplateString)
        } as CompiledTemplate)
    }

    return cardTemplate;
}

export function getAllCardTemplates() {
    return Array.from(allCardTemplates.values());
}

export function getCardTemplate(templateId: TemplateId) {
    return allCardTemplates.get(templateId);
}

export function getCardTemplateCompiled(templateId: TemplateId) {
    const template: CardTemplate | undefined = getCardTemplate(templateId);

    // If the template exists but is not yet compiled, compile and save.
    if (template && !allCardTemplatesCompiled.has(templateId)) {
        allCardTemplatesCompiled.set(templateId, {
            id: templateId,
            front: handlebars.compile(template.frontHtmlTemplateHtmlString),
            back: handlebars.compile(template.backHtmlTemplateString)
        } as CompiledTemplate)
    }

    return allCardTemplatesCompiled.get(templateId);
}

export function doesCardTemplateExist(templateId: TemplateId) {
    return allCardTemplates.has(templateId);
}

export function modifyCardTemplate(templateId: TemplateId, frontHtmlTemplateString: string, backHtmlTemplateString: string) {
    if (!allCardTemplates.has(templateId)) {
        throw new Error('[ModifyCardTemplate] Card template with given id does not exist.')
    }

    deleteCardTemplate(templateId);
    return createCardTemplate(templateId, frontHtmlTemplateString, backHtmlTemplateString)
}

export function deleteCardTemplate(templateId: TemplateId) {
    allCardTemplates.delete(templateId);
    allCardTemplatesCompiled.delete(templateId);
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


const basicCardTemplate: CardTemplate = createBasicCardTemplate();
export const basicCardTemplateId = basicCardTemplate.id; // Really just CardType.Basic ("Basic")

// todo - rest of card types

