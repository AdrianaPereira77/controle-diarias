import "./AutenticacaoLayout.css";

function AutenticacaoLayout({ titulo, subtitulo, children }) {
  return (
    <div className="autenticacao-layout">
      <div className="autenticacao-layout__cartao">
        <header className="autenticacao-layout__cabecalho">
          <span className="autenticacao-layout__marca">Controle de Diárias</span>
          <h1>{titulo}</h1>
          {subtitulo && <p>{subtitulo}</p>}
        </header>

        {children}
      </div>
    </div>
  );
}

export default AutenticacaoLayout;
