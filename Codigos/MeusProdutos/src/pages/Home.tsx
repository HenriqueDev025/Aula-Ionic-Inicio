import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButton} from '@ionic/react';
import { useHistory } from 'react-router';
import './Home.css';

const Home: React.FC = () => {

  const history = useHistory();

  function navegarParaCadastro(){
    history.push('/Cadastro');
  }

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

        <IonButton onClick={navegarParaCadastro}>Ir para Cadastro</IonButton>

      </IonContent>

    </IonPage>
  );
};

export default Home;