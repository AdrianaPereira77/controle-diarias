import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Principal.css";

function Principal({ children, titulo, voltarPara }) {
  const navigate = useNavigate();

  return (
    <main className="principal__root">
      {titulo && (
        <div className="principal__titulo">
          {voltarPara && (
            <button type="button" className="principal__titulo-voltar" onClick={() => navigate(voltarPara)}>
              <FaArrowLeft size={14} />
              Voltar
            </button>
          )}
          <h2>{titulo}</h2>
        </div>
      )}
      {children}
    </main>
  );
}

export default Principal;

