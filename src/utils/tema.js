const CHAVE_TEMA = "tema";

export function obterTemaSalvo() {
  const salvo = localStorage.getItem(CHAVE_TEMA);

  if (salvo === "dark" || salvo === "light") {
    return salvo;
  }

  const prefereEscuro =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefereEscuro ? "dark" : "light";
}

export function salvarTema(tema) {
  localStorage.setItem(CHAVE_TEMA, tema);
}

export function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);

  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.setAttribute("content", tema === "dark" ? "#0f1420" : "#12152b");
  }
}
