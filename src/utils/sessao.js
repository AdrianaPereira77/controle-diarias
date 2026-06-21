const CHAVE_SESSAO = "sessaoUsuario";

export function obterUsuarioLogado() {
  const dados = localStorage.getItem(CHAVE_SESSAO);

  if (!dados) {
    return null;
  }

  try {
    return JSON.parse(dados);
  } catch {
    return null;
  }
}

export function salvarSessao(usuario) {
  const dadosPublicos = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };

  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(dadosPublicos));
}

export function encerrarSessao() {
  localStorage.removeItem(CHAVE_SESSAO);
}

export function estaAutenticado() {
  return obterUsuarioLogado() !== null;
}
