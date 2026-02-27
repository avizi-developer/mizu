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

export interface CardTemplateCompiled {
    id: TemplateId,
    frontCompiledTemplate: HandlebarsTemplateDelegate,
    backCompiledTemplate: HandlebarsTemplateDelegate,
}

// todo will be loaded from folder
const allCardTemplates: Map<TemplateId, CardTemplate> = new Map();
const allCardTemplatesCompiled: Map<TemplateId, CardTemplateCompiled> = new Map();

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

    // Always recompile.
    compileCardTemplate(templateId);

    return cardTemplate;
}

export function getAllCardTemplates() {
    return Array.from(allCardTemplates.values());
}

export function getCardTemplate(templateId: TemplateId) {
    return allCardTemplates.get(templateId);
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

export function compileCardTemplate(templateId: TemplateId) {
    const template: CardTemplate | undefined = getCardTemplate(templateId);
    if (!template) {
        throw new Error('[CompileCardTemplate] Card template with given id does not exist.')
    }

    // OK to overwrite, since this function could be called to recompile a changed template.
    allCardTemplatesCompiled.set(templateId, {
        id: templateId,
        frontCompiledTemplate: handlebars.compile(template.frontHtmlTemplateHtmlString),
        backCompiledTemplate: handlebars.compile(template.backHtmlTemplateString)
    } as CardTemplateCompiled)

    return allCardTemplatesCompiled.get(templateId);
}

export function getCardTemplateCompiled(templateId: TemplateId) {
    const template: CardTemplate | undefined = getCardTemplate(templateId);
    if (!template) {
        throw new Error('[GetCardTemplateCompiled] Card template with given id does not exist.')
    }

    // If the template exists but is not yet compiled, compile and save.
    if (!allCardTemplatesCompiled.has(templateId)) {
        compileCardTemplate(templateId);
    }

    return allCardTemplatesCompiled.get(templateId);
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

// todo switch to load from disk
const basicCardTemplate: CardTemplate = createBasicCardTemplate();
export const basicCardTemplateId = basicCardTemplate.id; // Really just CardType.Basic ("Basic")

// todo - rest of card types

