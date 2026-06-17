import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonItem, useIonViewWillEnter, IonItemSliding, IonItemOption } from '@ionic/react';
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
  
  async function removerProdutos(id: number) {
    try {
      await service.remover(id);
      await carregarProdutos();
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  }
  //navegando para a página de cadastro
  function navegarParaCadastro(){
    history.push('/cadastro');
  }
  return (
    <IonPage className='topHome'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controle de Estoque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <h2>Inicio de Produtos</h2>

        <IonButton onClick={navegarParaCadastro}> Cadastrar Produto</IonButton>         
          <IonList>
            {produtos.map((produto) => {
              const id = produto.id ?? produto.ID;
              const nome = produto.nome ?? produto.NOME ?? 'Produto';
              const preco = Number(produto.preco ?? produto.PRECO ?? 0);
              const estoque = Number(produto.estoque ?? produto.quantidade ?? produto.ESTOQUE ?? 0);

              if (id == null) {
                return null;
              }

              return (
                <IonItemSliding key={id}>
                  <IonItem>
                    <IonLabel>
                      {nome} - R$ {Number.isFinite(preco) ? preco.toFixed(2) : '0.00'} | Estoque: {estoque}
                    </IonLabel>
                  </IonItem>
                  <IonItemOption onClick={() => removerProdutos(Number(id))}>
                    Remover
                  </IonItemOption>
                </IonItemSliding>
              );
            })}          
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;