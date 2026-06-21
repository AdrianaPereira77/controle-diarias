import "./CampoCustomizado.css";

function CampoCustomizado({ label, obrigatorio, opcoes, textarea, erro, className = "", ...props }) {
  return (
    <div className={`campo-customizado ${className}`.trim()}>
      {label && (
        <label htmlFor={props.id || props.name}>
          {label} {obrigatorio && <span className="campo-customizado__obrigatorio">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea className="campo-customizado__input" {...props} />
      ) : opcoes ? (
        <select className="campo-customizado__input" {...props}>
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.label}
            </option>
          ))}
        </select>
      ) : (
        <input className="campo-customizado__input" {...props} />
      )}

      {erro && <span className="campo-customizado__erro">{erro}</span>}
    </div>
  );
}

export default CampoCustomizado;

