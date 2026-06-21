import CampoCustomizado from "../CampoCustomizado/CampoCustomizado";
import BotaoCustomizado from "../BotaoCustomizado/BotaoCustomizado";
import "./DeslocamentoFormulario.css";

function DeslocamentoFormulario({ deslocamento, indice, onChange, onRemove, podeRemover }) {
  const atualizarCampo = (campo, valor) => {
    onChange(indice, { ...deslocamento, [campo]: valor });
  };

  return (
    <article className="deslocamento-formulario">
      <div className="deslocamento-formulario__topo">
        <h4>Deslocamento {indice + 1}</h4>
        {podeRemover && (
          <BotaoCustomizado tipo="secundario" aoClicar={() => onRemove(indice)}>
            Remover
          </BotaoCustomizado>
        )}
      </div>

      <div className="deslocamento-formulario__grid">
        <CampoCustomizado label="Cidade de origem" name={`origem-${deslocamento.id}`} value={deslocamento.origem} onChange={(e) => atualizarCampo("origem", e.target.value)} obrigatorio />
        <CampoCustomizado label="Cidade de destino" name={`destino-${deslocamento.id}`} value={deslocamento.destino} onChange={(e) => atualizarCampo("destino", e.target.value)} obrigatorio />
        <CampoCustomizado label="Data de ida" type="date" name={`data-ida-${deslocamento.id}`} value={deslocamento.dataIda} onChange={(e) => atualizarCampo("dataIda", e.target.value)} obrigatorio />
        <CampoCustomizado label="Data de retorno" type="date" name={`data-retorno-${deslocamento.id}`} value={deslocamento.dataRetorno} onChange={(e) => atualizarCampo("dataRetorno", e.target.value)} obrigatorio />
        <CampoCustomizado label="Transporte" name={`transporte-${deslocamento.id}`} value={deslocamento.transporte} onChange={(e) => atualizarCampo("transporte", e.target.value)} obrigatorio />
      </div>
    </article>
  );
}

export default DeslocamentoFormulario;

