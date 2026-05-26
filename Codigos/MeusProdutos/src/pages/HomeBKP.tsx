import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton} from '@ionic/react';
import './Home.css';
import { Produto } from '../Models/Produtos';
import React, { useState } from 'react';

const Home: React.FC = () => {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  function adicionarProdutos() {
    {/*instaciar a classe*/}
    const nova = new Produto("Refrigerante", 12);
    nova.adicionarEstoque(10);

    setProdutos([...produtos, nova]);

    console.log(produtos);
  }

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
            <IonInput label="Nome" placeholder="Produtos"></IonInput>
          </IonItem>

          <div className="ion-padding-start">
            <IonInput label="Preço" counter={true} maxlength={20}></IonInput>
          </div>
        </IonList>
        <IonButton onClick={adicionarProdutos}>
          Adicionar Tarefa
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
