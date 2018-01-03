import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { path, split, useWith, identity, memoize } from 'ramda';

import './ItemList.css';

const key = useWith(path, [split('.'), identity]);

export class ItemList extends PureComponent {
  constructor(props) {
    super(props);

    this.createItem = this.createItem.bind(this);
    this.createList = memoize(this.createList.bind(this));
  }

  createItem(item) {
    const { Element, keyPath, actions = {}, active } = this.props;

    return <div
      className="ItemList__item"
      key={ key(keyPath, item) }>
      {
        <Element
          item={ item }
          actions={ actions }
          isActive={ active === item }/>
      }
      {
        item.nested && <ItemList { ...this.props } list={ item.nested }/>
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
    const { list, Element, active } = this.props;
    return this.createList(list, Element, active);// for memoization
  }
}

ItemList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  Element: PropTypes.func.isRequired,
  keyPath: PropTypes.string.isRequired,
  active: PropTypes.object,
  actions: PropTypes.object,
  className: PropTypes.string,
};
