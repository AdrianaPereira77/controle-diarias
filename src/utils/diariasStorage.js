import { obterUsuarioLogado } from "./sessao";

const CHAVE_DIARIAS = "diarias";

function lerTodasDiarias() {
  const dados = localStorage.getItem(CHAVE_DIARIAS);

  if (!dados) {
    localStorage.setItem(CHAVE_DIARIAS, JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(dados);
  } catch {
    return [];
  }
}

function gravarTodasDiarias(diarias) {
  localStorage.setItem(CHAVE_DIARIAS, JSON.stringify(diarias));
}

function obterIdUsuarioAtual() {
  const usuario = obterUsuarioLogado();
  return usuario ? usuario.id : null;
}

export function listarDiarias() {
  const usuarioId = obterIdUsuarioAtual();

  if (!usuarioId) {
    return [];
  }

  return lerTodasDiarias().filter((diaria) => diaria.usuarioId === usuarioId);
}

export function buscarDiariaPorId(id) {
  return listarDiarias().find((diaria) => diaria.id === id);
}

export function salvarDiaria(diaria) {
  const usuarioId = obterIdUsuarioAtual();

  if (!usuarioId) {
    return;
  }

  const diarias = lerTodasDiarias();

  if (diaria.id) {
    const indice = diarias.findIndex(
      (item) => item.id === diaria.id && item.usuarioId === usuarioId
    );

    if (indice >= 0) {
      diarias[indice] = { ...diaria, usuarioId };
    }
  } else {
    diarias.push({ ...diaria, id: crypto.randomUUID(), usuarioId });
  }

  gravarTodasDiarias(diarias);
}

export function excluirDiaria(id) {
  const usuarioId = obterIdUsuarioAtual();

  const diariasAtualizadas = lerTodasDiarias().filter(
    (diaria) => !(diaria.id === id && diaria.usuarioId === usuarioId)
  );

  gravarTodasDiarias(diariasAtualizadas);
}
