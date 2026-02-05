import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonPage
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
    const decks = ['Deck 1', 'Deck 2', 'Deck 3']
    return (
        <IonPage>
            <IonContent>
                <div className={'ion-display-flex ion-flex-column ion-justify-content-center ion-align-items-center'}>
                    <IonCard>
                        <IonCardContent>
                            <div className={'ion-display-flex ion-flex-row'}>
                                <IonButton className={'ion-margin-end'} color={'primary'}>Create Deck</IonButton>
                                <IonButton color={'tertiary'}>Card Browser</IonButton>
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
                            {decks.map(deck => (
                                <div
                                    className={'ion-margin-bottom ion-display-flex ion-flex-row ion-align-items-center'}>
                                    <IonButton className={'ion-margin'}
                                               color={'white'}
                                               style={{
                                                   backgroundColor: 'white',
                                                   fontSize: 18,
                                                   color: '#16161d',
                                               }}>{deck}</IonButton>
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
