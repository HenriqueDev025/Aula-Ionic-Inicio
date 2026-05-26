import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  
    return (
      <IonPage>

        <IonHeader>
          <IonToolbar>
            <IonTitle>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>

          <IonList>

          </IonList>

        </IonContent>

      </IonPage>
    );
  };

export default Home;