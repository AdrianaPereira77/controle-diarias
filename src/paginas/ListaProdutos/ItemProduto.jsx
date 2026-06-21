import "./itemDiaria.css"; // Importa o CSS adaptado para ItemDiaria

function ItemDiaria({ diaria }) {
  return (
    <div className="item-diaria__root">
      <div className="item-diaria__info-linha">
        <span className="item-diaria__data">
          <strong>Data:</strong> {diaria.data}
        </span>
        <span className="item-diaria__valor">
          R$ {parseFloat(diaria.valor).toFixed(2)}
        </span>
      </div>

      <span className="item-diaria__descricao">
        {diaria.descricao}
      </span>

      {diaria.projeto && (
        <span className="item-diaria__projeto">
          <strong>Projeto:</strong> {diaria.projeto}
        </span>
      )}

      {diaria.observacoes && (
        <p className="item-diaria__observacoes">
          {diaria.observacoes}
        </p>
      )}
    </div>
  );
}

export default ItemDiaria;
