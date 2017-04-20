import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

import Pure from '../../HOC/Pure';

import Item from '../Item';
import IconButton from '../../controls/IconButton';

const ToDo = (props) => (
  <Item size="large" { ...props }>
    <input
      className="Item__section"
      type="checkbox"
      checked={ props.item.done }
      onChange={ () => props.actions.toggle(props.item)}/>
    <span className="Item__main">{ props.item.title }</span>
    <span className="Item__actions">
      <IconButton
        className="Item__button"
        name="edit"
        onClick={ () => ({}) }/>
    </span>
  </Item>
);

ToDo.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    edit: PropTypes.func,
    toggle: PropTypes.func.isRequired,
  }),
};

export default Pure(ToDo);
