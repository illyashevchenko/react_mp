import React from 'react';
import './Category.css';

import Item from '../Item/Item.js';

const Category = (props) => (
  <Item {...props}>{ props.title }</Item>
);

export default Category;
