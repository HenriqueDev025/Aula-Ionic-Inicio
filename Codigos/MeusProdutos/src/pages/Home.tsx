import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonItem, useIonViewWillEnter, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { useState } from 'react';
import { ProdutoService } from '../Services/ProdutoService';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  const [produtos, setProdutos] = useState<any[]>([]);

  //criando uma instância do serviço para manipular os produtos
  const service = new ProdutoService();

  //carregando os produtos ao montar o componente e sempre que a view entrar em foco
  useIonViewWillEnter(() => {
    carregarProdutos();
  });

  async function carregarProdutos() {
    const produtosCarregados = await service.listar();
    setProdutos(produtosCarregados);
  }
  
  async function removerProduto(id: number) {
    await service.remover(id);
    carregarProdutos();
  }
  //navegando para a página de cadastro
  function navegarParaCadastro(){
    history.push('/cadastro');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controle de Estoque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <h2>Bem-vindo ao Controle de Estoque</h2>

        <IonButton onClick={navegarParaCadastro}> Cadastrar Produto</IonButton>         
         <IonList>
          {produtos.map((produto, index) => {
            const estoque = produto.estoque ?? produto.quantidade ?? 0;
            return (
              <IonItemSliding key={index}>
                <IonItem>
                  <IonLabel>
                    {produto.nome} - R$ {produto.preco.toFixed(2)} | Estoque: {estoque}
                  </IonLabel>
                </IonItem>
                <IonItemOptions>
                  <IonItemOption color='danger' onClick={() => removerProduto(index)}>
                    Remover
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>

            );
            
          })}          
         </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;