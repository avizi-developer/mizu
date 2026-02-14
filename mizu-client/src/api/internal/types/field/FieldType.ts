import {ClozeFrontFieldContent, ImageOcclusionFieldContent, MarkdownFieldContent} from "./FieldContent";

export interface FieldTypeToContentMap {
    markdown: MarkdownFieldContent;
    cloze: ClozeFrontFieldContent;
    imageOcclusion: ImageOcclusionFieldContent;
}

