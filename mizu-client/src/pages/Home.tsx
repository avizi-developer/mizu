import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonPage
} from '@ionic/react';
import './Home.css';
import {
    IoBrowsersOutline,
    IoCreate,
    IoCreateOutline,
    IoSearchOutline,
    IoSettings,
    IoSettingsOutline
} from "react-icons/io5";

const Home: React.FC = () => {
    const decks = ['Deck 1', 'Deck 2', 'Deck 3']
    return (
        <IonPage>
            <IonContent>
                <div className={'ion-display-flex ion-flex-column ion-justify-content-center ion-align-items-center'}>
                    <IonCard>
                        <IonCardContent>
                            <div className={'ion-display-flex ion-flex-row'}>
                                <IonButton className={'ion-margin-end ion-display-flex ion-align-items-center'} color={'primary'}>
                                    <IoCreateOutline style={{marginRight: 5, marginBottom: 4, width: 24, height: 24,}}/>
                                    Create Deck
                                </IonButton>
                                <IonButton className={'ion-margin-end'} color={'secondary'}>
                                    <IoSearchOutline style={{marginRight: 5, width: 24, height: 24}}/>
                                    Card Browser
                                </IonButton>
                                <IonButton color={'tertiary'}>
                                    <IoSettingsOutline style={{marginRight: 5, width: 24, height: 24}}/>
                                    <span>Settings</span>
                                </IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>

                    <IonCard className={'ion-padding'} style={{minWidth: '50%'}}>
                        <IonCardHeader>
                            <IonCardTitle>
                                <div className={'ion-display-flex ion-flex-row ion-justify-content-center'}>
                                    <span>Decks</span>
                                </div>
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {decks.map((deck) => (
                                <div className={'ion-margin-bottom ion-padding ion-display-flex ion-flex-column ion-align-items-start'}>
                                    <h1>{deck}</h1>
                                    <IonButton color={'primary'}>Study</IonButton>
                                    <IonButton color={'secondary'}>Add Cards</IonButton>
                                </div>
                            ))}
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
