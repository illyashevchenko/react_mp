import React from 'react';
import './Category.css';

import Item from '../Item/Item.js';

const Category = ({ title }) => (
  <Item>{ title }</Item>
);

export default Category;
