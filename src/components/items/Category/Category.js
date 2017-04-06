import React from 'react';
import './Category.css';

import Item from '../Item/Item.js';
import IconButton from '../../controls/IconButton/IconButton.js';

const Category = ({ title }) => (
  <Item size="small">
    <input
      className="Item__section"
      type="checkbox"/>
    <span className="Item__main">
      <span className="Item__section">{ title }</span>
      <IconButton name="add"
                  size="small"
                  onClick={ () => {} }/>
      </span>
    <span className="Item__actions">
      <IconButton name="edit"
                  size="small"
                  onClick={ () => {} }/>
    </span>
  </Item>
);

export default Category;
