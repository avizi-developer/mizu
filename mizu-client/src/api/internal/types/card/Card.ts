import {CardTypeToFieldMap} from "./CardType";

export type Card<T extends keyof CardTypeToFieldMap = keyof CardTypeToFieldMap> = {
    id: string;
    front: CardTypeToFieldMap[T]['front'];
    back: CardTypeToFieldMap[T]['back']
}