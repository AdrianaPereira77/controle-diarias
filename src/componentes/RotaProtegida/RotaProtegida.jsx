import { Navigate } from "react-router-dom";
import { useAutenticacao } from "../../contexto/AutenticacaoContexto";

function RotaProtegida({ children }) {
  const { autenticado } = useAutenticacao();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RotaProtegida;
