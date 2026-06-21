import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTema } from "../../contexto/TemaContexto";
import "./AlternadorTema.css";

function AlternadorTema() {
  const { tema, alternarTema } = useTema();
  const escuro = tema === "dark";

  return (
    <button
      type="button"
      className="alternador-tema"
      onClick={alternarTema}
      aria-label={escuro ? "Ativar modo claro" : "Ativar modo escuro"}
      title={escuro ? "Modo claro" : "Modo escuro"}
    >
      {escuro ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
    </button>
  );
}

export default AlternadorTema;
