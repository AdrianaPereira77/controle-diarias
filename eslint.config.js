:root {
  --cor-primaria: #12152b;
  --cor-primaria-clara: #eef4ff;
  --cor-secundaria: #f59e0b;
  --cor-secundaria-escura: #ea580c;
  --cor-sucesso: #16a34a;
  --cor-info: #2563eb;
  --cor-erro: #dc2626;
  --cor-texto-padrao: #111827;
  --cor-texto-secundario: #4b5563;
  --cor-borda: #d9e2f2;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  background: var(--cor-primaria-clara);
  color: var(--cor-texto-padrao);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

