import {FieldTypeToContentMap} from "./FieldType";

export interface Field<T extends keyof FieldTypeToContentMap = keyof FieldTypeToContentMap> {
    type: T;
    content: FieldTypeToContentMap[T];
}

export type MarkdownField = Field<'markdown'>;

