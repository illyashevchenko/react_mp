import React from 'react';
import './Category.css';

import Item from '../Item/Item.js';
import IconButton from '../../controls/IconButton/IconButton.js';

const edit = () => ({});
const add = () => ({});

const Category = ({ title }) => (
  <Item size="small">
    <span className="Item__section"/>
    <span className="Item__main">
      <span className="Item__section">{ title }</span>
      <IconButton name="add"
                  size="small"
                  onClick={ add }/>
      </span>
    <span className="Item__actions">
      <IconButton name="edit"
                  size="small"
                  onClick={ edit }/>
    </span>
  </Item>
);

export default Category;
