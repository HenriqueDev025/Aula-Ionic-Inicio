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
}