import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';

const ClientesTable = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await fetch('http://localhost:3000/clientes');
            const data = await response.json();
            setClientes(data);
        };
        fetchClientes();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Telefone', accessor: 'telefone' },
            { Header: 'Endereço', accessor: 'endereco' },
            { Header: 'Data de Cadastro', accessor: 'data_cadastro' },
            { Header: 'Última Atualização', accessor: 'ultima_atualizacao' },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: clientes });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ClientesTable;
