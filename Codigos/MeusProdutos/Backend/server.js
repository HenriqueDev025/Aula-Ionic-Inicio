import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const arquivo = path.join(__dirname, "produtos.json");
const PORT = 3000;

app.get("/produtos", (req, res) => {
  try {
    const dados = fs.readFileSync(arquivo, "utf-8");
    const produtos = JSON.parse(dados);
    res.json(produtos);
  } catch (erro) {
    console.error("Erro ao ler produtos:", erro);
    res.status(500).json({ message: "Erro ao ler produtos" });
  }
});

app.post("/produtos", (req, res) => {
  try {
    const dados = fs.readFileSync(arquivo, "utf-8");
    const produtos = JSON.parse(dados);

    const novoProduto = {
      id: Date.now(),
      ...req.body,
    };

    produtos.push(novoProduto);
    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));

    res.status(201).json(novoProduto);
  } catch (erro) {
    console.error("Erro ao salvar produto:", erro);
    res.status(500).json({ message: "Erro ao salvar produto" });
  }
});

app.put("/produtos/:id", (req, res) => {
  try {
    const dados = fs.readFileSync(arquivo, "utf-8");
    let produtos = JSON.parse(dados);
    const id = Number(req.params.id);

    const encontrou = produtos.some((produto) => produto.id === id);

    if (!encontrou) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    produtos = produtos.map((produto) =>
      produto.id === id ? { ...produto, ...req.body } : produto
    );

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));
    res.json({ message: "Produto atualizado" });
  } catch (erro) {
    console.error("Erro ao atualizar produto:", erro);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
});

app.delete("/produtos/:id", (req, res) => {
  try {
    const dados = fs.readFileSync(arquivo, "utf-8");
    const id = Number(req.params.id);
    let produtos = JSON.parse(dados);

    const tamanhoAntes = produtos.length;
    produtos = produtos.filter((p) => p.id !== id);

    if (produtos.length === tamanhoAntes) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));
    res.json({ message: "Produto deletado" });
  } catch (erro) {
    console.error("Erro ao deletar produto:", erro);
    res.status(500).json({ message: "Erro ao deletar produto" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});