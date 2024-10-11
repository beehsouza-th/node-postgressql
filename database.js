async function connect(){

    if(global.connection)
        return global.connection.connect();

    const {Pool} = require ("pg");
    const pool = new Pool({
        connectionString:process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("Criou o pool de conexão");

    const res = await client.query("select now()");
    console.log(res.rows[0]);
    client.release();


    global.connection = pool;
    return pool.connect();

}
connect();

//retorna todos os clientes
async function selectCustomers(){
    const client = await connect();
    const res = await client.query("SELECT * FROM clientes");
    return res.rows;
}

//retorna apneas um cliente
async function selectCustomer(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM clientes WHERE ID =$1", [id]);
    return res.rows;
}

//cadastrar clientes
async function inserttCustomer(custumer){
    const client = await connect();
    const sql = "INSERT INTO clientes (nome,nascimento,idade,cpf) VALUES ($1,$2,$3,$4)";
    const values =[custumer.nome, custumer.nascimento, custumer.idade, custumer.cpf];
    await client.query(sql, values);
    return res.rows;
}
//atualizar um cliente
async function updateCustomer(id, custumer){
    const client = await connect();
    const sql = "UPDATE clientes SET nome=$1, nascimento=$2 , idade=$3 ,cpf=$4 WHERE id=$5";
    const values =[custumer.nome, custumer.nascimento, custumer.idade, custumer.cpf, id];
    await client.query(sql, values);
    return res.rows;
}

    module.exports ={
        selectCustomers,
        selectCustomer,
        inserttCustomer,
        updateCustomer

    }