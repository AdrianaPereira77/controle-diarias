import React from 'react';
import './Avatar.css';
function Avatar({ nome, iniciais }) {
  return (
    <div className="avatar-container">
      <div className="avatar-circulo">{iniciais}</div>
      {nome && <span className="avatar-nome">{nome}</span>}
    </div>
  );
}
export default Avatar;
