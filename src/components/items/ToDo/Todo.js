import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

import { Pure } from '../../HOC/Pure';

import { Item } from '../Item';
import { IconButton } from '../../controls/IconButton';

const ToDoRender = ({ item, actions }) => (
  <Item
    size="large"
    item={ item }>
    <input
      className="Item__section"
      type="checkbox"
      checked={ item.done }
      onChange={ () => actions.toggle(item) }/>
    <span className="Item__main">{ item.title }</span>
    <span className="Item__actions">
      <IconButton
        className="Item__button"
        name="edit"
        onClick={ () => actions.edit(item) }/>
    </span>
  </Item>
);

export const ToDo = Pure(ToDoRender);

ToDo.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    edit: PropTypes.func,
    toggle: PropTypes.func.isRequired,
  }),
};
