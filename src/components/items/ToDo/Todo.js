import React from 'react';
import './Todo.css';

import Item from '../Item/Item.js';
import IconButton from '../../controls/IconButton/IconButton.js';

const DoTo = ({ title }) => (
  <Item size="large">
    <input
      className="Item__section"
      type="checkbox"/>
    <span className="Item__main">{ title }</span>
    <span className="Item__actions">
      <IconButton
        name="edit"
        onClick={ () => {
        } }/>
    </span>
  </Item>
);

export default DoTo;
