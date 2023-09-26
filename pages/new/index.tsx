// pages/alterar/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Parse from 'parse/dist/parse.min.js';
import Cabecalho from '../components/cabecalho'
import Link from 'next/link';

const New = () => {

  const [data, setData] = useState(currentDate());

  const router = useRouter();

  function currentDate() {

    let date = new Date()
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    let fullDate = `${year}-${month}-${day}`;

    return fullDate;

  }

  async function existeFluxoCaixa(data) {

    const fc = new Parse.Query('FluxoCaixa');

    fc.contains('dia', data);

    let results = await fc.first();

    if (results != undefined) {
      alert("O dia selecionado já está cadastrado.");
      return true;
    } else {
      return false;
    }



  }

  async function criarFluxoCaixa() {

    let r = await existeFluxoCaixa(data);

    if (r) {
      return;
    }



    let estruturas = new Parse.Query('EstruturaContas');

    estruturas.contains('empresa', '1');

    let results = await estruturas.first();

    const contas = results.get("contas");

    let fluxo = new Parse.Object("FluxoCaixa");

    fluxo.set("contas", contas);
    fluxo.set("dia", data);

    fluxo.save()
      .then((fc) => {


        router.push('/edit/' + fc.id)


      }, (error) => {
        alert('Erro ao salvar fluxo de caixa. Erro: ' + error.message);
      });

  }

  const handleInputData = (event) => {

    setData(event.target.value);


  };

  return (

    <div className="bg-gray-100 h-screen">
      <Cabecalho />

      <div className="container mx-auto p-4">

        <h1 className="text-2xl font-semibold mb-4 inline">Novo Fluxo de Caixa</h1>
        <Link className="text-blue-500 hover:underline ml-2 inline" href='/'>Voltar para o início</Link>
        <div>

          <label>Informe a data:</label>



          <div className="flex space-x-4">

            <input className="border rounded p-2 pr-7" type="date" value={data} onChange={handleInputData}></input>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={criarFluxoCaixa}>Criar</button>


          </div>

        </div>


      </div>

    </div>


  );
};

export default New;
