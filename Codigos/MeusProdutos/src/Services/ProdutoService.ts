export class ProdutoService {
  baseUrl = "http://localhost:3000";

  async listar() {
    try {
      const res = await fetch(`${this.baseUrl}/produtos`);
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      return [];
    }
  }

  // adicionar um produto
  async adicionar(produto: any) {
    try {
      const res = await fetch(`${this.baseUrl}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (!res.ok) {
        throw new Error(`Falha ao adicionar produto: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      return null;
    }
  }

  // remover um produto
  async remover(id: number) {
    try {
      const res = await fetch(`${this.baseUrl}/produtos/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error(`Falha ao remover produto: ${res.status}`);
      }

      return await res.json().catch(() => null);
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      return null;
    }
  }
}