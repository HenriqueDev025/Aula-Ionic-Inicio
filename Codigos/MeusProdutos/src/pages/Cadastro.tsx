import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton } from '@ionic/react';
import './Cadastro.css';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useIonAlert } from '@ionic/react';
import { ProdutoService } from '../Services/ProdutoService';
import { Produto } from '../Models/Produtos';


const Cadastro: React.FC = () => {

  const nomeRef = useRef<any>(null);
  const precoRef = useRef<any>(null);
  const estoqueRef = useRef<any>(null);
  const history = useHistory();

  const [presentAlert] = useIonAlert()
  const service = new ProdutoService();

  async function adicionarProduto() {
    const nome = nomeRef.current?.value || "";
    const preco = parseFloat(precoRef.current?.value || "0");
    const estoque = parseInt(estoqueRef.current?.value || "0");

    if (nome && preco > 0 && estoque > 0) {
      const produto = new Produto(nome, preco);
      produto.adicionarEstoque(estoque);
      await service.adicionar(produto);
      presentAlert({
        header: 'Sucesso',
        message: 'Produto cadastrado com sucesso!',
        buttons: ['OK']
      });

      if (nomeRef.current) nomeRef.current.value = "";
      if (precoRef.current) precoRef.current.value = "";
      if (estoqueRef.current) estoqueRef.current.value = "";

      //history.push('/home');
    } else {
      presentAlert({
        header: 'Erro',
        message: 'Por favor, preencha o nome, preço e estoque corretamente.',
        buttons: ['OK']
      });
    }
  }

  function navegarParaHome(){
    history.push('/home');
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

            <IonButton onClick={navegarParaHome}> Voltar para Home</IonButton>
            <br />
            
            <IonInput ref={nomeRef} label="Descrição do Produto" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
            <br />

            <IonInput ref={precoRef} label="Preço" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
            <br />

            <IonInput ref={estoqueRef} label="Estoque" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>

          <IonButton className='ButCadastro' onClick={adicionarProduto}>Cadastrar Produto</IonButton>

          </IonList>

        </IonContent>

      </IonPage>
    );
  };

export default Cadastro;