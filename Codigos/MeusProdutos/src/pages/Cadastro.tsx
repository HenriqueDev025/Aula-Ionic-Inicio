import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton } from '@ionic/react';
import './Cadastro.css';
import { Produto } from '../Models/Produtos';
import React, { useState,useRef } from 'react';

const Cadastro: React.FC = () => {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const nomeRef = useRef<any>(null);
  const precoRef = useRef<any>(null);
  const estoqueRef = useRef<any>(null);

  function adicionarProduto() {
    const nome = nomeRef.current?.value || "";
    const preco = parseFloat(precoRef.current?.value || "0");
    const estoque = parseInt(estoqueRef.current?.value || "0");

    if (nome && preco > 0) {
      const novoProduto = new Produto(nome, preco);
      novoProduto.adicionarEstoque(estoque);

      setProdutos([...produtos, novoProduto]);

      console.log("Produto adicionado:", novoProduto);
      console.log("Produtos:", produtos);


      if (nomeRef.current) nomeRef.current.value = "";
      if (precoRef.current) precoRef.current.value = "";
      if (estoqueRef.current) estoqueRef.current.value = "";
    }
    
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
              <IonInput ref={nomeRef} label="Nome" placeholder="Produtos"></IonInput>
            </IonItem>

            <div>
              <IonInput ref={precoRef} label="Preco" counter={true} maxlength={20}></IonInput>
            </div>

            <div>
              <IonInput ref={estoqueRef} label="Estoque" counter={true} maxlength={20}></IonInput>
            </div>

          <IonButton className='ButCadastro' onClick={adicionarProduto}>Cadastrar Produto</IonButton>

          </IonList>

        </IonContent>

      </IonPage>
    );
  };

export default Cadastro;