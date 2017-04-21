import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { path, split, useWith, identity, memoize } from 'ramda';

import './ItemList.css';

const key = useWith(path, [split('.'), identity]);

const onClick = (select, item) =>
select && ((event) => {
  select(item);
  event.stopPropagation();
});

class ItemsList extends PureComponent {
  constructor(props) {
    super(props);

    this.createItem = this.createItem.bind(this);
    this.createList = memoize(this.createList.bind(this));
  }

  createItem(item) {
    const { Element, keyPath, actions = {}, active } = this.props;

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
        item.nested && <ItemsList { ...this.props } list={ item.nested }/>
      }
    </div>
  }

  createList(list) {
    return (
      <div className={ `ItemList  ${ this.props.className }` }>
        { list.map(this.createItem) }
      </div>
    );
  }

  render() {
    const { Element, active, list } = this.props;
    return this.createList(list, Element, active);// for memoization
  }
}

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
