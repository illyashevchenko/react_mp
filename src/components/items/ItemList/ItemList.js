import React, { PropTypes } from 'react';
import { path, split, useWith, identity, curry } from 'ramda';

import './ItemList.css';

const key = useWith(path, [split('.'), identity]);

const createItem = curry(function ({ Element, keyPath, actions = {}, active }, item) {
  return <div
    className="ItemList__item"
    key={ key(keyPath, item) }
    onClick={ actions.select && actions.select.bind(null, item) }>
    {
      <Element item={ item }
               actions={ actions }
               isActive={ active === item }/>
    }
  </div>
});

const ItemsList = (props) =>
  <div className={ `ItemList  ${ props.className }` }>
    { props.list.map(createItem(props)) }
  </div>;

ItemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  Element: PropTypes.func.isRequired,
  keyPath: PropTypes.string.isRequired,
  active: PropTypes.object,
  actions: PropTypes.shape({
    select: PropTypes.func,
  }),
  className: PropTypes.string,
};

export default ItemsList;
