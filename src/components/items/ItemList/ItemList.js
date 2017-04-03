import React, { PropTypes } from 'react';
import { path, split, useWith, identity, curry } from 'ramda';

import './ItemList.css';

const key = useWith(path, [split('.'), identity]);

const createItem = curry(({ Element, keyPath, select }, item) =>
  <div className="ItemList__item"
       key={ key(keyPath, item) }
       onClick={ select }>
    { <Element {...item}/> }
  </div>
);

const ItemsList = (props) =>
  <div className={ `ItemList  ${ props.className }` }>
    { props.list.map(createItem(props)) }
  </div>;

ItemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  Element: PropTypes.func.isRequired,
  keyPath: PropTypes.string.isRequired,
  select: PropTypes.func,
  className: PropTypes.string,
};

export default ItemsList;