import React, { FC } from 'react';
import { formatDecimal } from '../util/format';

interface GrupoProps {
  id: string;
  nome: string;
  identacao: number;
  valor: number;
  topo: string;
}

const Grupo: FC<GrupoProps> = ({ identacao, id, nome, valor, topo }: GrupoProps) => {
  const t = ' ';
  const classNameGrupo = topo === 'S' ? 'topo-do-grupo' : 'subgrupo';

  return (
        <div className="grid grid-cols-2 gap-4">


        <div className="w-1/2">
          <div className="text-lg font-semibold text-left">
			<pre>
              {t.repeat(identacao)}
              {nome}({id})
            </pre>

          </div>
        </div>
        <div className="w-1/2">
          <div className="text-gray-600 text-right">

				{formatDecimal(valor)}

          </div>
        </div>
      

    </div>

  );
};

export default Grupo;
