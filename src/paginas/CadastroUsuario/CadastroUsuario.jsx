import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AutenticacaoLayout from "../../componentes/AutenticacaoLayout/AutenticacaoLayout";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import { useAutenticacao } from "../../contexto/AutenticacaoContexto";
import { cadastrarUsuario, emailJaCadastrado } from "../../utils/usuariosStorage";
import validarEmail from "../../utils/validarEmail";

function criarUsuarioVazio() {
  return { nome: "", email: "", senha: "", confirmarSenha: "" };
}

function CadastroUsuario() {
  const navigate = useNavigate();
  const { autenticado, entrar } = useAutenticacao();
  const [usuario, setUsuario] = useState(() => criarUsuarioVazio());
  const [erros, setErros] = useState({});

  if (autenticado) {
    return <Navigate to="/" replace />;
  }

  const atualizarCampo = (campo, valor) => {
    setUsuario((estadoAtual) => ({ ...estadoAtual, [campo]: valor }));
    setErros((estadoAtual) => ({ ...estadoAtual, [campo]: "" }));
  };

  const validar = () => {
    const novosErros = {};

    if (!usuario.nome.trim()) novosErros.nome = "Informe o nome.";

    if (!usuario.email.trim()) novosErros.email = "Informe o e-mail.";
    else if (!validarEmail(usuario.email)) novosErros.email = "Informe um e-mail válido.";
    else if (emailJaCadastrado(usuario.email)) novosErros.email = "Este e-mail já está cadastrado.";

    if (!usuario.senha) novosErros.senha = "Informe a senha.";
    else if (usuario.senha.length < 6) novosErros.senha = "A senha deve ter ao menos 6 caracteres.";

    if (usuario.confirmarSenha !== usuario.senha) {
      novosErros.confirmarSenha = "As senhas não conferem.";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      toast.error("Verifique os campos do cadastro.");
      return false;
    }

    return true;
  };

  const cadastrar = (event) => {
    event.preventDefault();

    if (!validar()) return;

    const novoUsuario = cadastrarUsuario({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    });

    entrar(novoUsuario);
    toast.success("Cadastro realizado com sucesso!");
    navigate("/", { replace: true });
  };

  return (
    <AutenticacaoLayout titulo="Criar conta" subtitulo="Cadastre-se para começar a usar o sistema">
      <form className="autenticacao-form" onSubmit={cadastrar} noValidate>
        <CampoCustomizado
          label="Nome"
          name="nome"
          value={usuario.nome}
          onChange={(e) => atualizarCampo("nome", e.target.value)}
          obrigatorio
          erro={erros.nome}
        />
        <CampoCustomizado
          label="E-mail"
          type="email"
          name="email"
          value={usuario.email}
          onChange={(e) => atualizarCampo("email", e.target.value)}
          obrigatorio
          erro={erros.email}
        />
        <CampoCustomizado
          label="Senha"
          type="password"
          name="senha"
          value={usuario.senha}
          onChange={(e) => atualizarCampo("senha", e.target.value)}
          obrigatorio
          erro={erros.senha}
        />
        <CampoCustomizado
          label="Confirmar senha"
          type="password"
          name="confirmarSenha"
          value={usuario.confirmarSenha}
          onChange={(e) => atualizarCampo("confirmarSenha", e.target.value)}
          obrigatorio
          erro={erros.confirmarSenha}
        />
        <BotaoCustomizado tipo="primario" type="submit" className="autenticacao-form__botao">
          Cadastrar
        </BotaoCustomizado>
      </form>

      <p className="autenticacao-form__rodape">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </AutenticacaoLayout>
  );
}

export default CadastroUsuario;
