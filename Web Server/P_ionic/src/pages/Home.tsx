import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect } from 'react';

const Home: React.FC = () => {

  useEffect (() => {
        fetch("https://viacep.com.br/ws/49680000/json/")
        .then(res => res.json())
        .then(data => {
          console.log(data)
        });
      }, []);
  
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Home;