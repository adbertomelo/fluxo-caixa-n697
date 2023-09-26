// pages/alterar/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Parse from 'parse/dist/parse.min.js';
import Cabecalho from '../components/cabecalho'
import Grupo from '../components/grupo'
import Conta from '../components/conta'
import Link from 'next/link';

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contas, setContas] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {

    if (id) {

      const query = new Parse.Query('FluxoCaixa');

      query.get(id.toString()).then((result) => {
        if (result) {
          const res = result.get("contas")
          setContas(res);
          setData(result.get("dia"));
          recalcularContas(res);
        }
      });

    }
  }, [id]);

  async function Salvar() {


    let fc = new Parse.Object('FluxoCaixa');

    fc.set('objectId', id);
    // Set new done value and save Parse Object changes
    fc.set('contas', contas);

    try {
      await fc.save();
      // Success
      alert('Fluxo de Caixa salvo com sucesso!');
      // Refresh to-dos list

    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);

    };


  }

  function convertNumberToUsFormat(valor) {
    return Number.parseFloat(valor.replaceAll(".", "").replace(",", "."));
  }

  function handleKeyPress(event) {

  }

  function updValue(info, id, valor) {


    info.forEach((elem) => {

      if (elem.itens) {
        updValue(elem.itens, id, valor);
      }
      else {
        if (Number.parseInt(elem.id) === Number.parseInt(id))
          elem.valor = valor;
      }

    });

  }

  function handleOnChange(evt) {

    const id = evt.target.id;

    const valorCampo = evt.target.value;

    const valor = convertNumberToUsFormat(valorCampo);

    updValue(contas, id, valor);

    recalcularFC(contas);

  }

  function somatorio(itens) {

    var sum = itens.reduce(function(prevVal, elem) {

      if (elem.itens) {
        return prevVal + somatorio(elem.itens);
      }
      else {
        return prevVal + Number.parseFloat(elem.valor) * Number.parseInt(elem.sinal);
      }

    }, 0);

    return sum;

  }

  function recalcularContas(info) {

    const n = info.map((d) => {

      if (d.itens) {
        d.valor = somatorio(d.itens);
        recalcularContas(d.itens);
      }

      return (d);

    })

    return n;

  }

  function recalcularFC(contas) {

    const contasRecalculadas = recalcularContas(contas);

    setContas(contasRecalculadas)

  }

  function f(info, pos) {
    const identacao = pos * 3;

    return (

      info.map((d) => {

        if (d.itens) {

          return (
            <div key={d.id}>

              <Grupo id={d.id} nome={d.nome} identacao={identacao} valor={d.valor} topo={d.topo} />

              {
                f(d.itens, pos + 1)
              }

            </div>
          )

        }
        else {

          return (

            <div key={d.id}>

              <Conta
                id={d.id}
                nome={d.nome}
                identacao={identacao}
                valor={d.valor}
                handleKeyPress={handleKeyPress}
                handleOnChange={handleOnChange}
              />

            </div>
          )
        }
      })

    )
  }
  return (
    <div className="bg-gray-100 h-screen">

      <Cabecalho />

      <div className="container mx-auto p-4">


        <h1 className="text-2xl font-semibold mb-4 inline">Alteração</h1>
        <Link className="text-blue-500 hover:underline ml-2 inline" href='/'>Voltar para o início</Link>


        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={Salvar}>Salvar</button>
        </div>

        <div className="grid grid-cols-2 gap-4">


          <div className="w-1/2">
            <div className="text-lg font-semibold text-left">
              Conta
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-gray-600 text-right" >
              {data}
            </div>
          </div>


        </div>

        <div>

          {
            contas == null ? "" : f(contas, 0)
          }

        </div>

      </div>

    </div>


  );
};

export default Edit;
