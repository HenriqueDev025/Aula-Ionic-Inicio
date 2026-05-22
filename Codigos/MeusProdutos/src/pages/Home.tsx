import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList } from '@ionic/react';
import './Home.css';
import { Produto } from '../Models/MeusProdutos';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="ListForm">
          <IonItem>
            <IonInput label="Nome" placeholder="Lula"></IonInput>
          </IonItem>

          <div className="ion-padding-start">
            <IonInput label="Texto" counter={true} maxlength={20}></IonInput>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
