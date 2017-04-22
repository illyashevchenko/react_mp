import React from 'react';
import { Pure } from '../../HOC/Pure';
import './Header.css';

function HeaderRender(props) {
  return (
    <div className="Header">
      <h1 className="Header__heading">{ props.text }</h1>
      <div className="Header__tools">{ props.children }</div>
    </div>
  );
}

export const Header = Pure(HeaderRender);
