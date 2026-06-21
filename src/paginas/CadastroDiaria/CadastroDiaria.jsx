import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import DeslocamentoFormulario from "../../componentes/DeslocamentoFormulario/DeslocamentoFormulario";
import Principal from "../../componentes/Principal/Principal";
import { criarIdLocal } from "../../utils/criarIdLocal";
import { buscarDiariaPorId, salvarDiaria } from "../../utils/diariasStorage";
import "./CadastroDiaria.css";

function criarDeslocamentoVazio() {
  return {
    id: criarIdLocal(),
    origem: "",
    destino: "",
    dataIda: "",
    dataRetorno: "",
    transporte: "",
  };
}

function criarDiariaVazia() {
  return {
    numero: "",
    agentePublico: "",
    matricula: "",
    cargo: "",
    cidade: "",
    dataPagamento: "",
    situacao: "Pendente",
    observacoes: "",
    deslocamentos: [criarDeslocamentoVazio()],
  };
}

function prepararDiariaParaEdicao(diaria) {
  return {
    ...diaria,
    deslocamentos:
      diaria.deslocamentos?.map((deslocamento) => ({
        ...deslocamento,
        id: deslocamento.id || criarIdLocal(),
      })) || [criarDeslocamentoVazio()],
  };
}

function CadastroDiaria() {
  const navigate = useNavigate();
  const params = useParams();
  const diariaEncontrada = params.diariaId ? buscarDiariaPorId(params.diariaId) : null;
  const [erros, setErros] = useState({});
  const [diaria, setDiaria] = useState(() =>
    diariaEncontrada ? prepararDiariaParaEdicao(diariaEncontrada) : criarDiariaVazia()
  );

  useEffect(() => {
    if (params.diariaId && !diariaEncontrada) {
      toast.error("Diária não encontrada.");
      navigate("/");
    }
  }, [diariaEncontrada, navigate, params.diariaId]);

  const atualizarCampo = (campo, valor) => {
    setDiaria((estadoAtual) => ({ ...estadoAtual, [campo]: valor }));
    setErros((estadoAtual) => ({ ...estadoAtual, [campo]: "" }));
  };

  const atualizarDeslocamento = (indice, novoDeslocamento) => {
    setDiaria((estadoAtual) => ({
      ...estadoAtual,
      deslocamentos: estadoAtual.deslocamentos.map((item, posicao) =>
        posicao === indice ? novoDeslocamento : item
      ),
    }));
  };

  const adicionarDeslocamento = () => {
    setDiaria((estadoAtual) => ({
      ...estadoAtual,
      deslocamentos: [...estadoAtual.deslocamentos, criarDeslocamentoVazio()],
    }));
  };

  const removerDeslocamento = (indice) => {
    setDiaria((estadoAtual) => ({
      ...estadoAtual,
      deslocamentos: estadoAtual.deslocamentos.filter((_, posicao) => posicao !== indice),
    }));
  };

  const validar = () => {
    const novosErros = {};

    if (!diaria.numero.trim()) novosErros.numero = "Informe o número da diária.";
    if (!diaria.agentePublico.trim()) novosErros.agentePublico = "Informe o agente público.";
    if (!diaria.matricula.trim()) novosErros.matricula = "Informe a matrícula.";
    if (!diaria.cargo.trim()) novosErros.cargo = "Informe o cargo.";
    if (!diaria.cidade.trim()) novosErros.cidade = "Informe a cidade.";
    if (!diaria.dataPagamento) novosErros.dataPagamento = "Informe a data de pagamento.";

    const deslocamentoInvalido = diaria.deslocamentos.some(
      (deslocamento) =>
        !deslocamento.origem.trim() ||
        !deslocamento.destino.trim() ||
        !deslocamento.dataIda ||
        !deslocamento.dataRetorno ||
        !deslocamento.transporte.trim()
    );

    if (deslocamentoInvalido) {
      novosErros.deslocamentos = "Preencha todos os campos dos deslocamentos.";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      toast.error("Verifique os campos obrigatórios.");
      return false;
    }

    return true;
  };

  const salvar = (event) => {
    event.preventDefault();

    if (!validar()) return;

    salvarDiaria(diaria);
    toast.success(diaria.id ? "Diária atualizada com sucesso!" : "Diária cadastrada com sucesso!");
    navigate("/");
  };

  return (
    <Principal titulo={diaria.id ? "Editar diária" : "Nova diária"} voltarPara="/">
      <form className="cadastro-diaria" onSubmit={salvar}>
        <section className="cadastro-diaria__bloco">
          <h3>Informações Básicas</h3>
          <div className="cadastro-diaria__grid">
            <CampoCustomizado label="Número da diária" name="numero" value={diaria.numero} onChange={(e) => atualizarCampo("numero", e.target.value)} obrigatorio erro={erros.numero} />
            <CampoCustomizado label="Agente público" name="agentePublico" value={diaria.agentePublico} onChange={(e) => atualizarCampo("agentePublico", e.target.value)} obrigatorio erro={erros.agentePublico} />
            <CampoCustomizado label="Matrícula" name="matricula" value={diaria.matricula} onChange={(e) => atualizarCampo("matricula", e.target.value)} obrigatorio erro={erros.matricula} />
            <CampoCustomizado label="Cargo" name="cargo" value={diaria.cargo} onChange={(e) => atualizarCampo("cargo", e.target.value)} obrigatorio erro={erros.cargo} />
            <CampoCustomizado label="Cidade" name="cidade" value={diaria.cidade} onChange={(e) => atualizarCampo("cidade", e.target.value)} obrigatorio erro={erros.cidade} />
            <CampoCustomizado label="Data de pagamento" type="date" name="dataPagamento" value={diaria.dataPagamento} onChange={(e) => atualizarCampo("dataPagamento", e.target.value)} obrigatorio erro={erros.dataPagamento} />
            <CampoCustomizado label="Situação" name="situacao" value={diaria.situacao} onChange={(e) => atualizarCampo("situacao", e.target.value)} obrigatorio opcoes={[{ valor: "Regular", label: "Regular" }, { valor: "Pendente", label: "Pendente" }, { valor: "Ressalva", label: "Ressalva" }]} />
            <CampoCustomizado label="Observações" name="observacoes" value={diaria.observacoes} onChange={(e) => atualizarCampo("observacoes", e.target.value)} textarea className="cadastro-diaria__campo-inteiro" />
          </div>
        </section>

        <section className="cadastro-diaria__bloco">
          <div className="cadastro-diaria__topo-bloco">
            <h3>Deslocamentos</h3>
            <BotaoCustomizado tipo="secundario" aoClicar={adicionarDeslocamento}>Adicionar deslocamento</BotaoCustomizado>
          </div>

          <div className="cadastro-diaria__lista-deslocamentos">
            {diaria.deslocamentos.map((deslocamento, indice) => (
              <DeslocamentoFormulario key={deslocamento.id} indice={indice} deslocamento={deslocamento} onChange={atualizarDeslocamento} onRemove={removerDeslocamento} podeRemover={diaria.deslocamentos.length > 1} />
            ))}
          </div>

          {erros.deslocamentos && <p className="cadastro-diaria__erro-bloco">{erros.deslocamentos}</p>}
        </section>

        <div className="cadastro-diaria__acoes">
          <BotaoCustomizado tipo="secundario" aoClicar={() => navigate("/")}>Cancelar</BotaoCustomizado>
          <BotaoCustomizado tipo="primario" type="submit">Salvar</BotaoCustomizado>
        </div>
      </form>
    </Principal>
  );
}

export default CadastroDiaria;
