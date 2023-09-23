// pages/alterar/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Parse from 'parse/dist/parse.min.js';
import Cabecalho from '../components/cabecalho'
import Grupo from '../components/grupo'
import Conta from '../components/conta'

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
    <div className='container'>

      <Cabecalho />

      <div className='corpo'>


        <div>

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


          {
            contas == null ? "" : f(contas, 0)
          }

        </div>

      </div>

    </div>


  );
};

export default Edit;
