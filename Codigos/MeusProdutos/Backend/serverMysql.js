import express from "express";
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'controle_produtos'
});

const port = 3000;

db.connect ((err)=>{
    if(err){
        console.error('Error ao conectar ao MySQL:', err.message);
        process.exit(1);
    }
    console.log('MySQL ao conectar ao MySQL');
})


app.get('/produtos', (req, res)=>{
    db.query('SELECT * FROM produtos', (err, results) => {
        res.json(results);
    });
});

app.listen(port, () =>{
    console.log('Servidor rodando na porta ${port}');
});