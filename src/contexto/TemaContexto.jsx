import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { aplicarTema, obterTemaSalvo, salvarTema } from "../utils/tema";

const TemaContexto = createContext(null);

export function ProvedorTema({ children }) {
  const [tema, setTema] = useState(() => obterTemaSalvo());

  useEffect(() => {
    aplicarTema(tema);
    salvarTema(tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((atual) => (atual === "dark" ? "light" : "dark"));
  };

  const valor = useMemo(() => ({ tema, alternarTema }), [tema]);

  return <TemaContexto.Provider value={valor}>{children}</TemaContexto.Provider>;
}

export function useTema() {
  const contexto = useContext(TemaContexto);

  if (!contexto) {
    throw new Error("useTema deve ser usado dentro de um ProvedorTema.");
  }

  return contexto;
}
