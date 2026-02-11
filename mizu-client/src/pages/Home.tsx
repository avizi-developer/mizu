import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonIcon,
    IonPage,
    IonTitle
} from '@ionic/react';
import './Home.css';
import {
    IoChevronDown,
    IoChevronForward,
    IoCreateOutline,
    IoSearchOutline,
    IoSettingsOutline
} from "react-icons/io5";
import React, {useState} from 'react';

interface Deck {
    id: string;
    name: string;
    due: number;
    new: number;
    subDecks?: Deck[];
}

const DeckItem: React.FC<{ deck: Deck; level?: number }> = ({ deck, level = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const hasSubDecks = deck.subDecks && deck.subDecks.length > 0;

    return (
        <>
            <IonCard style={{ marginLeft: `${level * 1.5}rem`, minWidth: '50%' }}>
                <IonCardHeader className="ion-no-padding">
                    <div className="ion-display-flex ion-align-items-center ion-justify-content-between ion-padding-horizontal ion-padding-top">
                        <div className="ion-display-flex ion-align-items-center" style={{ gap: '0.5rem' }}>
                            {hasSubDecks && (
                                <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer', display: 'flex' }}>
                                    {expanded ? <IoChevronDown /> : <IoChevronForward />}
                                </div>
                            )}
                            {!hasSubDecks && <div style={{ width: '16px' }}></div>}
                            <IonCardTitle style={{ fontSize: '1.2rem' }}>{deck.name}</IonCardTitle>
                        </div>
                        <IonCardSubtitle>{deck.due} due, {deck.new} new</IonCardSubtitle>
                    </div>
                </IonCardHeader>
                <IonCardContent>
                    <div className={'ion-display-flex ion-justify-content-end'}>
                        <IonButton fill="clear" size="small">Add Cards</IonButton>
                        <IonButton size="small">Study</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
            {expanded && deck.subDecks?.map(subDeck => (
                <DeckItem key={subDeck.id} deck={subDeck} level={level + 1} />
            ))}
        </>
    );
};

const Home: React.FC = () => {
    const decks: Deck[] = [
        {
            id: '1', name: 'Japanese', due: 10, new: 5, subDecks: [
                { id: '1-1', name: 'Hiragana', due: 5, new: 0 },
                { id: '1-2', name: 'Katakana', due: 5, new: 5 },
                {
                    id: '1-3', name: 'Kanji', due: 0, new: 0, subDecks: [
                        { id: '1-3-1', name: 'N5', due: 0, new: 0 },
                        { id: '1-3-2', name: 'N4', due: 0, new: 0 },
                    ]
                }
            ]
        },
        { id: '2', name: 'Geography', due: 20, new: 10 },
        { id: '3', name: 'History', due: 0, new: 0 }
    ];

    return (
        <IonPage>
            <IonContent>
                <div className={'ion-padding home-container'}>
                    <div className={'ion-padding ion-display-flex ion-justify-content-center'} style={{ gap: '1rem' }}>
                        <IonButton>
                            <IoCreateOutline slot="start" />
                            Create Deck
                        </IonButton>
                        <IonButton color={'light'}>
                            <IoSearchOutline slot="start" />
                            Card Browser
                        </IonButton>
                        <IonButton color={'light'}>
                            <IoSettingsOutline slot="start" />
                            Settings
                        </IonButton>
                    </div>

                    <div className={'ion-text-center ion-padding-top'}>
                        <IonTitle>Decks</IonTitle>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        paddingTop: '1rem'
                    }}>
                        {decks.map((deck) => (
                            <DeckItem key={deck.id} deck={deck} />
                        ))}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
