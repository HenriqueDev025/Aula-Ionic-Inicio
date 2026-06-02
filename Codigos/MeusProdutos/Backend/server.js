import express from "express";

import fs from "fs";

const app = express();
app.use(express.json());

const arquivo = "Produtos.json";
const PORT = 3000;

//get//
app.get("/produtos", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    const produtos = JSON.parse(dados);
    res.json(produtos);
});

//post//
app.post("/produtos",(req, res) => {
    const dados = fs.readFileSync(arquivo);
    const produtos = JSON.parse(dados);
    
    const novoProduto = {
        id: Date.now(),
        ...req.body
    };
    produtos.push(novoProduto);
    fs.writeFileSync(arquivo, JSON.stringify(produtos, null,2));
    res.json(novoProduto);
});

//put//
app.put("/produtos/:id",(req, res) => {
    const dados = fs.readFileSync(arquivo);
    let produtos = JSON.parse(dados);

    produtos = produtos.map(p =>
        p.id == req.params.id ? { ...p, ...req.body } : p
    );
    fs.writeFileSync(arquivo,JSON.stringify(produtos,null,2));
    res.json({ msg: "Atualizado" });
});

//Delete//
app.delete("/produtos/:id", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    let produtos = JSON.parse(dados);

    produtos = produtos.filter(p => p.id != req.params.id);

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));
    res.json({msg: "Removido"});
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});