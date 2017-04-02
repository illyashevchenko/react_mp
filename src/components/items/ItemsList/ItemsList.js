import React, { PropTypes } from 'react';
import { path, split, useWith, identity, curry } from 'ramda';

import './ItemsList.css';

const key = useWith(path, [split('.'), identity]);

const createItem = curry(({ Element, keyPath, select }, item) =>
  <div className="ItemList__item"
       key={ key(keyPath, item) }
       onClick={ select }>
    { <Element {...item}/> }
  </div>
);

const ItemsList = (props) =>
  <div className="ItemsList">
    { props.list.map(createItem(props)) }
  </div>;

ItemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  Element: PropTypes.func,
  keyPath: PropTypes.string.isRequired,
  select: PropTypes.func,
};

export default ItemsList;
