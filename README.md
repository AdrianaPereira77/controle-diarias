# Controle de Diárias

## Sobre o projeto

Aplicação web em React para controlar diárias de servidores públicos. O sistema permite:

- Cadastro de diárias
- Listagem e busca por número, agente, matrícula, cidade e situação
- Filtro por situação: Regular, Pendente e Ressalva
- Edição e exclusão de registros
- Uso de Service Worker para offline básico

## Tecnologias

- React
- Vite
- React Router
- React Toastify
- React Icons

## Configuração do ambiente

### 1. Instalar Node.js

Este projeto usa `npm` para instalar dependências e executar o sistema.

Se você está usando NVM para Windows (`nvm-windows`):

```powershell
nvm install lts
nvm use lts
```

### 2. Verificar as versões

```powershell
node --version
npm --version
```

Se você estiver no PowerShell e receber erro de execução de scripts no `npm`, abra um terminal como administrador e execute:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois, feche o terminal e abra novamente.

### 3. Instalar dependências

No diretório do projeto:

```powershell
npm install
```

## Iniciar o sistema

```powershell
npm run dev
```

O Vite iniciará o projeto e exibirá a URL local, normalmente:

```text
http://localhost:5173
```

Abra essa URL no navegador para usar a aplicação.

## Comandos úteis

- `npm run dev` - iniciar o servidor de desenvolvimento
- `npm run build` - gerar a versão de produção em `dist/`
- `npm run preview` - testar a build de produção localmente

## O que o sistema faz

Ao abrir a aplicação, você encontrará:

- Dashboard com resumo de diárias totais, regulares, pendentes e com ressalva
- Formulário para cadastrar nova diária
- Lista de diárias com ações de editar e excluir
- Busca e filtros para encontrar registros rapidamente

## Como o trabalho atende aos requisitos

- Cadastro de diária: implementado em `src/paginas/CadastroDiaria/CadastroDiaria.jsx`, com formulário completo e validação dos campos obrigatórios.
- Edição de diária: a mesma página `CadastroDiaria.jsx` também carrega dados existentes quando a URL contém `:diariaId`.
- Exclusão de diária: implementada em `src/paginas/ListaDiarias/ListaDiarias.jsx` usando `excluirDiaria` em `src/utils/diariasStorage.js`.
- Listagem de diárias: feita em `src/paginas/ListaDiarias/ListaDiarias.jsx`, exibindo tabela e cards de resumo.
- Busca e filtro por situação: implementados em `ListaDiarias.jsx` com `useMemo`, campos de busca e checkboxes de filtro.
- Navegação entre telas: gerenciada por `react-router-dom` em `src/App.jsx`, com rotas para lista, cadastro/edição e página não encontrada.
- Notificações de sucesso e erro: exibidas com `react-toastify` em `src/App.jsx` e `src/paginas/CadastroDiaria/CadastroDiaria.jsx`.
- Armazenamento local de dados: feito em `src/utils/diariasStorage.js` com funções como `listarDiarias`, `salvarDiaria`, `buscarDiariaPorId` e `excluirDiaria`.
- Componentes reutilizáveis: `src/componentes/` contém botões, campos, cabeçalho, rodapé, layout principal e formulários de deslocamento.
- Service Worker / offline: `src/main.jsx` registra o service worker e `public/sw.js` cuida do cache básico do app shell.

## Fluxo de atividades por requisito

### Cadastro de diária
1. Usuário clica em "Nova Diária" em `src/paginas/ListaDiarias/ListaDiarias.jsx`, acionando `navigate("/cadastro-diaria")`.
2. `src/App.jsx` abre a rota `"/cadastro-diaria/:diariaId?"` e renderiza `CadastroDiaria`.
3. `CadastroDiaria.jsx` usa `useParams()` para verificar se há `diariaId`; sem id, inicia com `criarDiariaVazia()`.
4. Cada campo do formulário chama `atualizarCampo()` ou `atualizarDeslocamento()` para manter o estado local atualizado.
5. Ao enviar o formulário, `salvar(event)` chama `validar()`.
6. `validar()` verifica campos obrigatórios e deslocamentos. Em caso de erro, exibe `toast.error(...)`.
7. Se válido, `salvarDiaria(diaria)` em `src/utils/diariasStorage.js` grava no `localStorage`.
8. Depois, `toast.success(...)` mostra confirmação e `navigate("/")` retorna para a lista.

### Edição de diária
1. O botão de edição em `ListaDiarias.jsx` chama `navigate(`/cadastro-diaria/${diaria.id}`)`.
2. `CadastroDiaria.jsx` detecta `params.diariaId`, busca a diária com `buscarDiariaPorId(params.diariaId)` e preenche o formulário.
3. O usuário altera campos e envia o formulário.
4. `salvarDiaria(diaria)` identifica que `diaria.id` existe, localiza o índice com `findIndex()` e substitui o registro.
5. O app exibe `toast.success(...)` e retorna para a tela de listagem.

### Exclusão de diária
1. Botão de exclusão em `ListaDiarias.jsx` chama `remover(diaria)`.
2. `remover()` pede confirmação com `window.confirm(...)`.
3. Se confirmado, chama `excluirDiaria(diaria.id)` em `src/utils/diariasStorage.js`.
4. `excluirDiaria()` filtra a lista atual e grava o resultado no `localStorage`.
5. `ListaDiarias.jsx` atualiza o estado com `setDiarias(listarDiarias())` para atualizar a interface.

### Listagem de diárias
1. `ListaDiarias.jsx` inicializa `diarias` com `useState(() => listarDiarias())`.
2. `listarDiarias()` lê `localStorage`, cria a chave se não existir e retorna os dados.
3. O componente calcula o resumo de situações com `filter()` para `regulares`, `pendentes` e `ressalvas`.
4. O JSX renderiza os cards de resumo e tabela de registros.

### Busca e filtro
1. Campo de busca atualiza `busca` via `setBusca()` em `ListaDiarias.jsx`.
2. Cada checkbox de situação chama `alternarFiltro(situacao)` para alternar o estado em `filtros`.
3. `diariasFiltradas` é recalculado em `useMemo()` sempre que `busca`, `diarias` ou `filtros` mudam.
4. A função compara o termo de busca com `numero`, `agentePublico`, `cidade`, `situacao` e `matricula`.
5. O resultado filtrado é renderizado na tabela.

### Navegação entre telas
1. `src/App.jsx` usa `createBrowserRouter()` para definir rotas.
2. Rota `/` mostra `ListaDiarias`, e `/cadastro-diaria/:diariaId?` mostra `CadastroDiaria`.
3. `navigate()` do `react-router-dom` faz a transição entre as telas.
4. `Layout` em `App.jsx` mantém `Cabecalho` e `Rodape` constantes.

### Notificações
1. `ToastContainer` em `src/App.jsx` habilita mensagens globais.
2. `CadastroDiaria.jsx` usa `toast.error()` em validação falha ou registro não encontrado.
3. `CadastroDiaria.jsx` usa `toast.success()` após salvar ou atualizar.

### Armazenamento local de dados
1. `src/utils/diariasStorage.js` centraliza o acesso ao `localStorage`.
2. `listarDiarias()` retorna o array de diárias, inicializando a chave quando necessário.
3. `buscarDiariaPorId(id)` retorna o registro com o id correspondente.
4. `salvarDiaria(diaria)` adiciona ou atualiza no armazenamento.
5. `excluirDiaria(id)` remove o registro selecionado.

### Service Worker / offline
1. `src/main.jsx` verifica `if ("serviceWorker" in navigator)` e registra `/sw.js`.
2. `public/sw.js` faz cache do app shell (`/`, `/index.html`, `/manifest.webmanifest`, `/logo.png`).
3. O service worker responde com conteúdo cacheado quando a rede não está disponível.

## Estrutura principal

- `src/App.jsx` - configuração de rotas e layout
- `src/main.jsx` - entrada do React
- `src/paginas/` - páginas do sistema
- `src/componentes/` - componentes reutilizáveis
- `src/utils/` - utilitários de armazenamento e validação


- `src/App.jsx` - configuração de rotas e layout
- `src/main.jsx` - entrada do React
- `src/paginas/` - páginas do sistema
- `src/componentes/` - componentes reutilizáveis
- `src/utils/` - utilitários de armazenamento e validação
