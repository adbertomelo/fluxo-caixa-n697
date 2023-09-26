import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import Link from 'next/link';
import Cabecalho from './components/cabecalho'

const Home: NextPage = () => {

  const [fluxoCaixa, setFluxoCaixa] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    findAll();

  }, []);

  async function findAll() {

    const query = new Parse.Query('FluxoCaixa');

    query.find().then((results) => {
      setFluxoCaixa(results);
      setLoading(false);
    });

    setLoading(false)

  }

  async function handleDelete(id) {

    if (!window.confirm('Tem certeza que deseja excluir este item?' + id)) { return; }


    const fc = new Parse.Object('FluxoCaixa');
    fc.set('objectId', id);

    try {

      await fc.destroy();

      alert('Fluxo de Caixa excluído com sucesso!');

      findAll();

      return true;

    } catch (error) {

      alert('Erro ao excluir fluxo de caixa');
      return false;
    };

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

          <Link className="text-blue-500 hover:underline mr-2" href={`/new`}>Criar Fluxo de Caixa</Link>

          <h1 className="text-2xl font-semibold mb-4">Fluxos De Caixa</h1>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-right">Posição das Contas</th>
                <th className="px-4 py-2" text-center>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fluxoCaixa.map((f) => (



                <tr key={f.id} className="border-b">
                  <td className="px-4 py-2 text-left">{f.get("dia")}</td>
                  <td className="px-4 py-2 text-right">
                    {
                      f.get("contas")[0]["valor"]
                    }
                  </td>
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
