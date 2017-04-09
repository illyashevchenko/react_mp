import React from 'react';
import './Header.css';

function Header(props) {
  return (
    <div className="Header">
      <h1 className="Header__heading">{ props.text }</h1>
      <span className="Header__tools">{ props.children }</span>
    </div>
  );
}

export default Header;
