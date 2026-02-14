import {
    ClozeBackFieldContent,
    ClozeFrontFieldContent,
    ImageOcclusionFieldContent,
    MarkdownFieldContent
} from "../field/FieldContent";

export const CardType = {
    BASIC: 'basic',
    CLOZE: 'cloze',
    IMAGE_OCCLUSION: 'imageOcclusion'
}

export interface CardTypeToFieldMap {
    basic: {
        front: MarkdownFieldContent;
        back: MarkdownFieldContent;
    };
    cloze: {
        front: ClozeFrontFieldContent;
        back: {
            text: ClozeBackFieldContent;
            extra: MarkdownFieldContent;
        }
    }
    imageOcclusion: {
        front: ImageOcclusionFieldContent;
        back: {
            image: Blob;
            extra: MarkdownFieldContent;
        }
    }
}