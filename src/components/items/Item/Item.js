import React from 'react';
import './Item.css';

const baseClass = 'Item';

const getClass = (size = 'small') => `${ baseClass } ${ baseClass }--${ size }`;

const Item = ({ children, size }) => (
  <div
    className={ getClass(size) }>
    { children }
  </div>
);

export default Item;
