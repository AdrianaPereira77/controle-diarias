import "./BotaoCustomizado.css";

function BotaoCustomizado({ children, tipo = "primario", aoClicar, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      className={`botao-customizado botao-customizado--${tipo} ${className}`.trim()}
      onClick={aoClicar || onClick}
    >
      {children}
    </button>
  );
}

export default BotaoCustomizado;

