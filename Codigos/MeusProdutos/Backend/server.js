import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const arquivo = path.join(__dirname, "Produtos.json");
const PORT = 3000;

// Função auxiliar para ler produtos
async function lerProdutos() {
    try {
        const dados = await fs.readFile(arquivo, "utf-8");
        return JSON.parse(dados);
    } catch (err) {
        console.error("Erro ao ler arquivo:", err);
        return [];
    }
}

// Função auxiliar para salvar produtos
async function salvarProdutos(produtos) {
    try {
        await fs.writeFile(arquivo, JSON.stringify(produtos, null, 2));
    } catch (err) {
        console.error("Erro ao salvar arquivo:", err);
        throw err;
    }
}

// GET - Listar todos os produtos
app.get("/produtos", async (req, res) => {
    try {
        const produtos = await lerProdutos();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
});

// POST - Criar novo produto
app.post("/produtos", async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ erro: "Corpo da requisição vazio" });
        }

        const produtos = await lerProdutos();
        
        const novoProduto = {
            id: Date.now(),
            ...req.body,
            dataCriacao: new Date().toISOString()
        };
        
        produtos.push(novoProduto);
        await salvarProdutos(produtos);
        
        res.status(201).json(novoProduto);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar produto" });
    }
});

// PUT - Atualizar produto
app.put("/produtos/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        let produtos = await lerProdutos();
        const indice = produtos.findIndex(p => p.id === id);

        if (indice === -1) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }

        produtos[indice] = { ...produtos[indice], ...req.body };
        await salvarProdutos(produtos);
        
        res.json({ msg: "Produto atualizado", produto: produtos[indice] });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
});

// DELETE - Remover produto
app.delete("/produtos/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        let produtos = await lerProdutos();
        const comprimentoInicial = produtos.length;
        
        produtos = produtos.filter(p => p.id !== id);

        if (produtos.length === comprimentoInicial) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }

        await salvarProdutos(produtos);
        res.json({ msg: "Produto removido com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao remover produto" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});