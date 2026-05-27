import { Produto } from "../Models/Produtos";

export class ProdutoService{

    private chave = "produtos";

    // Salvar lista no localStorage
    salvar(produtos: Produto[]){
        localStorage.setItem(this.chave, JSON.stringify(produtos));
    }

    //obter lista
    listar(): Produto[]{
        const dados = localStorage.getItem(this.chave);

        if(!dados) return [];

        return JSON.parse(dados);
    }

    //adicionar produto
    adicionar(produto: Produto){
        const lista = this.listar();
        lista.push(produto);
        this.salvar(lista);
    }

    //remover produtos
    remover(index: number){
        const lista = this.listar();
        lista.splice(index, 1);
        this.salvar(lista);

    }

}