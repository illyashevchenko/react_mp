import React from 'react';
import './Todo.css';

import Item from '../Item/Item.js';
import IconButton from '../../controls/IconButton/IconButton.js';

const DoTo = (props) => (
  <Item size="large" { ...props }>
    <input
      className="Item__section"
      type="checkbox"/>
    <span className="Item__main">{ props.title }</span>
    <span className="Item__actions">
      <IconButton
        name="edit"
        onClick={ () => {
        } }/>
    </span>
  </Item>
);

export default DoTo;
