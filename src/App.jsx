import {
  createHashRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";
import RotaProtegida from "./componentes/RotaProtegida/RotaProtegida";
import { ProvedorAutenticacao, useAutenticacao } from "./contexto/AutenticacaoContexto";
import CadastroDiaria from "./paginas/CadastroDiaria/CadastroDiaria";
import CadastroUsuario from "./paginas/CadastroUsuario/CadastroUsuario";
import ListaDiarias from "./paginas/ListaDiarias/ListaDiarias";
import Login from "./paginas/Login/Login";

function Layout({ children }) {
  const navigate = useNavigate();
  const { usuario, sair } = useAutenticacao();

  const aoSair = () => {
    sair();
    navigate("/login", { replace: true });
  };

  return (
    <div className="app-shell">
      <Cabecalho userName={usuario?.nome} userEmail={usuario?.email} onLogout={aoSair} />
      <div className="app-shell__conteudo">{children}</div>
      <Rodape />
    </div>
  );
}

const roteador = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <CadastroUsuario />,
  },
  {
    path: "/",
    element: (
      <RotaProtegida>
        <Layout>
          <ListaDiarias />
        </Layout>
      </RotaProtegida>
    ),
  },
  {
    path: "/lista-diarias",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/cadastro-diaria/:diariaId?",
    element: (
      <RotaProtegida>
        <Layout>
          <CadastroDiaria />
        </Layout>
      </RotaProtegida>
    ),
  },
  {
    path: "*",
    element: (
      <RotaProtegida>
        <Layout>
          <div className="app-shell__nao-encontrada">
            <h2>Página não encontrada.</h2>
          </div>
        </Layout>
      </RotaProtegida>
    ),
  },
]);

function App() {
  return (
    <ProvedorAutenticacao>
      <RouterProvider router={roteador} />
      <ToastContainer position="top-right" autoClose={2500} />
    </ProvedorAutenticacao>
  );
}

export default App;
