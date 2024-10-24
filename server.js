require("dotenv").config();
const express = require("express");
const { Pool } = require("pg"); // ou 'mysql' dependendo do seu banco de dados
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projeto',
    password: 'BRENDALINDA',
    port: 5432,
});

app.use(express.json());

// Rota para obter todos os clientes
app.get("/clientes", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes", error });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
