import {Collection} from "../collection/collection";
import {Deck} from "../collection/deck/Deck";
import {AnyCard} from "../collection/card/Card";
import {MediaType} from "./MediaType";
import {doesDirExist, readFile, writeFile} from "../filesystem/filesystem";
import * as path from "node:path";

const MIZU_FOLDER_PATH; // TODO the current folder being used for the app - needs to support electron, capacitor, and web (for mizu sync)
const COLLECTION_FILE_PATH = path.join(MIZU_FOLDER_PATH, 'collection.json')
const DECKS_DIR = path.join(MIZU_FOLDER_PATH, 'decks')

export async function saveCollection(collection: Collection) {
    return await writeFile(COLLECTION_FILE_PATH, JSON.stringify(collection));
}

export async function loadCollection(): Promise<Collection>{
    const rawString = await readFile(COLLECTION_FILE_PATH)
    try {
        const collection: Collection = JSON.parse(rawString) as Collection;
        const loadDeckPromises = [];
        for (const deck of collection.decks) {
            loadDeckPromises.push(loadDeck(deck.id));
        }

        await Promise.all(loadDeckPromises);
        return collection;
    } catch (err) {
        console.error(err);
        throw new Error('[LoadCollection]: Failed to parse collection.json due to invalid formatting.')
    }
}

export async function saveDeck(deck: Deck) {
    const DECK_DIR = path.join(DECKS_DIR, deck.id);
    if (!doesDirExist(DECK_DIR)) {
        // todo
    }
}

export async function loadDeck(deckId: string) {
    // Load all cards in this deck.


    // Recursively load all subdecks if present.
}

export async function saveCards(cards: AnyCard[]) {
    // todo - save each card to its own json file inside parent deck folder
}

export async function saveMedia(mediaType: MediaType, media: any) {
    // todo
}

export async function saveImage(image: any) {
    return saveMedia(MediaType.Image, image);
}

export async function saveAudio(audio: any) {
    return saveMedia(MediaType.Audio, audio);
}

export async function saveVideo(video: any) {
    return saveMedia(MediaType.Video, video);
}