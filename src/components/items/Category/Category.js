import React from 'react';
import './Category.css';

import Item from '../Item/Item.js';
import IconButton from '../../controls/IconButton/IconButton.js';

const edit = () => ({});
const add = () => ({});

const Category = (props) => (
  <Item size="small" { ...props }>
    <span className="Item__section"/>
    <span className="Item__main">
      <span className="Item__section">{ props.item.title }</span>
      <IconButton className="Item__button"
                  name="edit"
                  size="small"
                  onClick={ add }/>
      </span>
    <span className="Item__actions">
      <IconButton className="Item__button"
                  name="remove"
                  size="small"
                  onClick={ edit }/>
      <IconButton className="Item__button"
                  name="add"
                  size="small"
                  onClick={ edit }/>
    </span>
  </Item>
);

export default Category;
