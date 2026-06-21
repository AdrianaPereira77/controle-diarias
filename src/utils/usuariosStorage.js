const CHAVE_USUARIOS = "usuarios";

export function listarUsuarios() {
  const dados = localStorage.getItem(CHAVE_USUARIOS);

  if (!dados) {
    return [];
  }

  try {
    return JSON.parse(dados);
  } catch {
    return [];
  }
}

export function buscarUsuarioPorEmail(email) {
  const alvo = String(email || "").trim().toLowerCase();
  return listarUsuarios().find((usuario) => usuario.email === alvo);
}

export function emailJaCadastrado(email) {
  return Boolean(buscarUsuarioPorEmail(email));
}

export function cadastrarUsuario({ nome, email, senha }) {
  const usuarios = listarUsuarios();

  const novoUsuario = {
    id: crypto.randomUUID(),
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    senha,
    criadoEm: new Date().toISOString(),
  };

  usuarios.push(novoUsuario);
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));

  return novoUsuario;
}
