import React from 'react';
import './Todo.css';

import Item from '../Item/Item.js';
import IconButton from '../../controls/IconButton/IconButton.js';

const DoTo = ({ title }) => (
  <Item size="large">
    <input
      className="Item__button Todo__input"
      type="checkbox"/>
    <span className="Item__title">{ title }</span>
    <span className="Item__actions">
      <IconButton name="edit"
                  onClick={ () => {} }/>
      <IconButton name="add"
                  onClick={ () => {} }/>
    </span>
  </Item>
);

export default DoTo;
