require("dotenv").config();

const database = require("./database");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.json({
        message:"Funcionando!"
    })
})

//retorna apenas um cliente
app.get("/clientes/:id", async (req,res) =>{
    const cliente = await database.selectCustomer(req.params.id);
    res.json(cliente);
})


//retorna todos os clientes
app.get("/clientes", async (req,res) =>{
    const clientes = await database.selectCustomers();
    res.json(clientes);
})

//cadastros de clientes
app.post("/clientes", async (req,res) =>{
    await database.selectCustomer(req.body);
    res.sendStatus(201);
})
 //atualizando clientes
app.patch("/clientes/:id", async (req,res) =>{
    await database.updateCustomer(req.params.id, req.body);
    res.sendStatus(200);
})


app.listen(port);

console.log("Backend rodando"); 