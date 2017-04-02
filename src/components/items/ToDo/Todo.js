import React from 'react';
import './Todo.css';

import Item from '../Item/Item.js';

const DoTo = ({ title }) => (
  <Item>{ title }</Item>
);

export default DoTo;
