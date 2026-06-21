import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AutenticacaoLayout from "../../componentes/AutenticacaoLayout/AutenticacaoLayout";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import { useAutenticacao } from "../../contexto/AutenticacaoContexto";
import { buscarUsuarioPorEmail } from "../../utils/usuariosStorage";
import validarEmail from "../../utils/validarEmail";

function Login() {
  const navigate = useNavigate();
  const { autenticado, entrar } = useAutenticacao();
  const [credenciais, setCredenciais] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState({});

  if (autenticado) {
    return <Navigate to="/" replace />;
  }

  const atualizarCampo = (campo, valor) => {
    setCredenciais((estadoAtual) => ({ ...estadoAtual, [campo]: valor }));
    setErros((estadoAtual) => ({ ...estadoAtual, [campo]: "" }));
  };

  const validar = () => {
    const novosErros = {};

    if (!credenciais.email.trim()) novosErros.email = "Informe o e-mail.";
    else if (!validarEmail(credenciais.email)) novosErros.email = "Informe um e-mail válido.";

    if (!credenciais.senha) novosErros.senha = "Informe a senha.";

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const entrarNoSistema = (event) => {
    event.preventDefault();

    if (!validar()) return;

    const usuario = buscarUsuarioPorEmail(credenciais.email);

    if (!usuario) {
      toast.error("Usuário não encontrado.");
      setErros({ email: "Usuário não encontrado." });
      return;
    }

    if (usuario.senha !== credenciais.senha) {
      toast.error("Senha incorreta.");
      setErros({ senha: "Senha incorreta." });
      return;
    }

    entrar(usuario);
    toast.success(`Bem-vindo(a), ${usuario.nome}!`);
    navigate("/", { replace: true });
  };

  return (
    <AutenticacaoLayout titulo="Entrar" subtitulo="Acesse sua conta para gerenciar as diárias">
      <form className="autenticacao-form" onSubmit={entrarNoSistema} noValidate>
        <CampoCustomizado
          label="E-mail"
          type="email"
          name="email"
          value={credenciais.email}
          onChange={(e) => atualizarCampo("email", e.target.value)}
          obrigatorio
          erro={erros.email}
        />
        <CampoCustomizado
          label="Senha"
          type="password"
          name="senha"
          value={credenciais.senha}
          onChange={(e) => atualizarCampo("senha", e.target.value)}
          obrigatorio
          erro={erros.senha}
        />
        <BotaoCustomizado tipo="primario" type="submit" className="autenticacao-form__botao">
          Entrar
        </BotaoCustomizado>
      </form>

      <p className="autenticacao-form__rodape">
        Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </AutenticacaoLayout>
  );
}

export default Login;
