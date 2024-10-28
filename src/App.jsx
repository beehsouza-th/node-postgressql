import './App.css';
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [dados, setDados] = useState([]);

  const filtarUsuarios = () => {
    //o Método get serve par buscar as informações e ou pegar
    axios.get('http://localhost:3000/clientes/')
      .then(response => {
        setDados(response.data);
      })
      .catch(error => {
        console.error('Erro ao listar usuários:', error);
      });
  };

  return (
    <main>
      <Header/>
      <center className="button-camp">
      <button className="btn-list" onClick={filtarUsuarios}>Listar Usuários</button>
      </center>
      <div>
        <table className="table-database">
          <thead className='table-database-colum'>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Nascimento</th>
              <th>idade</th>
              <th>cpf</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((usuario) => (
              <tr className='table-database-colum'  key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.ra}</td>
                <td>{usuario.datanascimento}</td>
                <td>{usuario.sexo}</td>
                <td>{usuario.cidade}</td>
                <td>{usuario.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
}