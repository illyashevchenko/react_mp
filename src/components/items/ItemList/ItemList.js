import React, { PropTypes } from 'react';
import { path, split, useWith, identity, curry } from 'ramda';

import './ItemList.css';

const key = useWith(path, [split('.'), identity]);

const onClick = (select, item) =>
select && ((event) => {
  select(item);
  event.stopPropagation();
});

const createItem = curry(function (props, item) {
  const { Element, keyPath, actions = {}, active } = props;
  return <div
    className="ItemList__item"
    key={ key(keyPath, item) }
    onClick={ onClick(actions.select, item) }>
    {
      <Element item={ item }
               actions={ actions }
               isActive={ active === item }/>
    }
    {
      item.nested && <ItemsList { ...props } list={ item.nested }/>
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
