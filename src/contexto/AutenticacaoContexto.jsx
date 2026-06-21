import { createContext, useContext, useMemo, useState } from "react";
import {
  encerrarSessao,
  obterUsuarioLogado,
  salvarSessao,
} from "../utils/sessao";

const AutenticacaoContexto = createContext(null);

export function ProvedorAutenticacao({ children }) {
  const [usuario, setUsuario] = useState(() => obterUsuarioLogado());

  const entrar = (dadosUsuario) => {
    salvarSessao(dadosUsuario);
    setUsuario(obterUsuarioLogado());
  };

  const sair = () => {
    encerrarSessao();
    setUsuario(null);
  };

  const valor = useMemo(
    () => ({
      usuario,
      autenticado: Boolean(usuario),
      entrar,
      sair,
    }),
    [usuario]
  );

  return (
    <AutenticacaoContexto.Provider value={valor}>
      {children}
    </AutenticacaoContexto.Provider>
  );
}

export function useAutenticacao() {
  const contexto = useContext(AutenticacaoContexto);

  if (!contexto) {
    throw new Error(
      "useAutenticacao deve ser usado dentro de um ProvedorAutenticacao."
    );
  }

  return contexto;
}
