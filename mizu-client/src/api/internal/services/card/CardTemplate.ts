import * as handlebars from "handlebars";

/**
 * The template strings are html/css/js that are compatible with handlebars,
 * using double braces, for example {{var1}}, around variables.
 */
export interface CardTemplate {
    frontHtmlTemplateCompiled: HandlebarsTemplateDelegate;
    backHtmlTemplateCompiled: HandlebarsTemplateDelegate;
}

export const basicCardFrontHtmlTemplateString: string = `
<div>{{front}}</div>
`;

export const basicCardFrontTemplateCompiled = handlebars.compile(basicCardFrontHtmlTemplateString);

export const basicCardBackHtmlTemplateString: string = `
<div>{{front}}</div>
<hr/>
<div>{{back}}</div>
`;

export const basicCardBackTemplateCompiled = handlebars.compile(basicCardBackHtmlTemplateString)
