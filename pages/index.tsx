import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import Link from 'next/link';
import Cabecalho from './components/cabecalho'

const Home: NextPage = () => {

  const [fluxoCaixa, setFluxoCaixa] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    const query = new Parse.Query('FluxoCaixa'); // Substitua pelo nome da sua classe no Parse
    query.find().then((results) => {
      setFluxoCaixa(results);
      setLoading(false);
    });

    setLoading(false)

  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?' + id)) {
      // Faça a chamada à API de exclusão e mostre o toast de sucesso, se apropriado
    }
  };



  if (isLoading) {

    return (

      <p>Carregando...</p>

    )
  } else {

    return (

      <div className="bg-gray-100 h-screen">
        <Cabecalho />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Fluxos De Caixa</h1>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-right">Saldo</th>
                <th className="px-4 py-2" text-center>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fluxoCaixa.map((f) => (
                <tr key={f.id} className="border-b">
                  <td className="px-4 py-2 text-left">{f.get("dia")}</td>
                  <td className="px-4 py-2 text-right">0</td>
                  <td className="px-4 py-2 text-center">
                    <Link className="text-blue-500 hover:underline mr-2" href={`/edit/${f.id}`}>Alterar</Link>

                    <a href="#" onClick={() => handleDelete(f.id)} className="text-red-500 hover:underline">Excluir</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>




    )
  }


}

export default Home
