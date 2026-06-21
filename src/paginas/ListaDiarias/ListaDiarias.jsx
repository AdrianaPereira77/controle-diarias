import { useMemo, useState } from "react";
import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { excluirDiaria, listarDiarias } from "../../utils/diariasStorage";
import "./ListaDiarias.css";

function formatarData(data) {
  if (!data) return "-";
  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}

function ListaDiarias() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState({ Regular: true, Pendente: true, Ressalva: true });
  const [diarias, setDiarias] = useState(() => listarDiarias());

  const resumo = {
    total: diarias.length,
    regulares: diarias.filter((diaria) => diaria.situacao === "Regular").length,
    pendentes: diarias.filter((diaria) => diaria.situacao === "Pendente").length,
    ressalvas: diarias.filter((diaria) => diaria.situacao === "Ressalva").length,
  };

  const diariasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return diarias.filter((diaria) => {
      const statusPermitido = filtros[diaria.situacao];
      const bateBusca =
        !termo ||
        [diaria.numero, diaria.agentePublico, diaria.cidade, diaria.situacao, diaria.matricula].some((valor) =>
          String(valor || "").toLowerCase().includes(termo)
        );

      return statusPermitido && bateBusca;
    });
  }, [busca, diarias, filtros]);

  const alternarFiltro = (situacao) => {
    setFiltros((estadoAtual) => ({ ...estadoAtual, [situacao]: !estadoAtual[situacao] }));
  };

  const remover = (diaria) => {
    if (!window.confirm(`Deseja realmente excluir a diária ${diaria.numero}?`)) {
      return;
    }

    excluirDiaria(diaria.id);
    setDiarias(listarDiarias());
  };

  return (
    <Principal titulo="Dashboard de diárias">
      <section className="lista-diarias__cards">
        <article className="lista-diarias__card">
          <span>Total de Diárias</span>
          <strong>{resumo.total}</strong>
        </article>
        <article className="lista-diarias__card">
          <span>Regulares</span>
          <strong className="lista-diarias__card-valor--regular">{resumo.regulares}</strong>
        </article>
        <article className="lista-diarias__card">
          <span>Pendentes</span>
          <strong className="lista-diarias__card-valor--pendente">{resumo.pendentes}</strong>
        </article>
        <article className="lista-diarias__card">
          <span>Ressalvas</span>
          <strong className="lista-diarias__card-valor--ressalva">{resumo.ressalvas}</strong>
        </article>
      </section>

      <section className="lista-diarias__painel">
        <div className="lista-diarias__painel-topo">
          <h3>Registros de Diárias</h3>
          <BotaoCustomizado tipo="primario" aoClicar={() => navigate("/cadastro-diaria")}>
            <span className="lista-diarias__botao-nova">
              <MdAdd size={18} />
              Nova Diária
            </span>
          </BotaoCustomizado>
        </div>

        <div className="lista-diarias__filtros">
          {Object.keys(filtros).map((situacao) => (
            <label key={situacao} className="lista-diarias__checkbox">
              <input type="checkbox" checked={filtros[situacao]} onChange={() => alternarFiltro(situacao)} />
              <span>{situacao}</span>
            </label>
          ))}
        </div>

        <CampoCustomizado
          label="Buscar"
          placeholder="Número, agente, matrícula, cidade ou situação"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          name="busca-diarias"
        />

        <div className="lista-diarias__tabela-wrapper">
          <table className="lista-diarias__tabela">
            <thead>
              <tr>
                <th>Nº Diária</th>
                <th>Agente Público</th>
                <th>Cidade</th>
                <th>Data Pagamento</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {diariasFiltradas.map((diaria) => (
                <tr key={diaria.id}>
                  <td data-label="Nº Diária">{diaria.numero}</td>
                  <td data-label="Agente Público">{diaria.agentePublico}</td>
                  <td data-label="Cidade">{diaria.cidade}</td>
                  <td data-label="Data Pagamento">{formatarData(diaria.dataPagamento)}</td>
                  <td data-label="Situação">
                    <span className={`lista-diarias__badge lista-diarias__badge--${diaria.situacao.toLowerCase()}`}>
                      {diaria.situacao}
                    </span>
                  </td>
                  <td data-label="Ações">
                    <div className="lista-diarias__acoes">
                      <button type="button" onClick={() => navigate(`/cadastro-diaria/${diaria.id}`)}>
                        <MdEdit size={18} />
                      </button>
                      <button type="button" onClick={() => remover(diaria)}>
                        <MdDeleteOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {diariasFiltradas.length === 0 && <p className="lista-diarias__mensagem-vazia">Nenhuma diária encontrada.</p>}
      </section>
    </Principal>
  );
}

export default ListaDiarias;

