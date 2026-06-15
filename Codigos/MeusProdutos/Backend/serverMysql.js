import express from "express";
import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passoword: 'root',
    database: 'controle_produtos'
});


const app = express()

const port = 3000;

app.get('/produtos', (req, res)=>{
    db.query('SELECT * FROM produtos', (err, results) => {
        res.json(results);
    });
});
app.listen(port, () =>{
    console.log('Servidor rodando na porta ${port}');
});