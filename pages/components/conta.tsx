import React, { FC } from 'react';
import { NumericFormat } from 'react-number-format';

interface ContaProps {
  identacao: number;
  id: string;
  nome: string;
  valor: number;
  handleKeyPress: (event: any) => void;
  handleOnChange: (event: any) => void;
}


const Conta: FC<ContaProps> = ({
  identacao,
  id,
  nome,
  valor,
  handleKeyPress,
  handleOnChange
}: ContaProps) => {

  return (

    <div className="grid grid-cols-2 gap-4">


      <div className="w-1/2">
        <div className="text-lg font-semibold text-left">
          <pre><span className="white-spaces">{' '.repeat(identacao)}</span><span id={`span_${id}`} >{nome}({id})</span></pre>
        </div>
      </div>
      <div className="w-1/2">
        <div className="text-gray-600 text-right">

          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix=""
            decimalScale={2}
            displayType="input"
            fixedDecimalScale={true}
            autoComplete="off"
            id={id}
            defaultValue={valor}
            onKeyPress={handleKeyPress}
            onChange={handleOnChange}
            className="text-right"
          />

        </div>
      </div>


    </div>

  )

}

export default Conta;