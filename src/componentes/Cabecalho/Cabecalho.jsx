import { MdOutlineLogout, MdOutlinePerson } from "react-icons/md";
import BotaoCustomizado from "../BotaoCustomizado/BotaoCustomizado";
import "./Cabecalho.css";

function Cabecalho({ userName, userEmail, onLogout }) {
  return (
    <header className="cabecalho-app">
      <div className="cabecalho-esquerda">
        <h1>Prestação de Contas de Diárias</h1>
        <div className="info-usuario">
          <MdOutlinePerson size={18} />
          <span>{userName} ({userEmail})</span>
        </div>
      </div>

      <BotaoCustomizado tipo="secundario" aoClicar={onLogout}>
        <span className="cabecalho-app__botao">
          <MdOutlineLogout size={18} />
          Sair
        </span>
      </BotaoCustomizado>
    </header>
  );
}

export default Cabecalho;

