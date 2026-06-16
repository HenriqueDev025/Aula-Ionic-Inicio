import { Produto } from "../Models/Produtos";

const API_URL = "http://localhost:3000/produtos";

export class ProdutoService {
  async listar(): Promise<Produto[]> {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os produtos.");
    }

    return resposta.json();
  }

  async adicionar(produto: Produto): Promise<Produto> {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível cadastrar o produto.");
    }

    return resposta.json();
  }

  async remover(id: number): Promise<void> {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível remover o produto.");
    }
  }
}