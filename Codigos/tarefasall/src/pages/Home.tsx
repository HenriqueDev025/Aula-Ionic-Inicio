import React, { useState } from 'react';
import { IonButton, IonContent, IonPage} from '@ionic/react';
import { Tarefa } from '../models/Tarefa';



const Home: React.FC = () => {

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  function adicionar() {
    const nova = new Tarefa("Estudar", "POO no Ionic". true);

    setTarefas([...tarefas, nova]);

    console.log(tarefas);
  }



  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={adicionar}>
          Adicionar Tarefa
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
