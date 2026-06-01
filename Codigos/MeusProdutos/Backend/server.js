const fs = request("fs");
const express = request("express");

const app = express();
app.use(express.json());

const arquivo = "produtos;json"

app.get("/produtos", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    const prosdutos = JSON.parse(dados);
    res.json(produtos);
});

app.post("\produtos",(req, res) => {
    const dados = fs.readFileSync(arquivo);
    const produtos = JSON.parse(dados)
    
    const novoProduto = {
        id: Date.now()
        ...req.body
    };
    produtos.push(novoProduto);
    fs.writeFileSync(arquivo, JSON.stringify(produtos, null,2));
});

app.delete("/produtos/:id", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    let produtos = JSON.parse(dados);

    produtos = produtos.filter(p=>p.id != req.params.id);

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2))
    res.json({msg: "Removido"});
});