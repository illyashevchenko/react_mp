import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

import { Pure } from '../../HOC/Pure';

const baseClass = 'Item';

const onClick = (actions, item) => (
  actions &&
  actions.select &&
  (
    (event) => {
      actions.select(item);
      event.stopPropagation();
    }
  )
);

const getClass = ({ size = 'small', isActive, staticTools }) =>
  [
    baseClass,
    `${ baseClass }--${ size }`,
    isActive ? `${ baseClass }--active` : '',
    staticTools ? '' : `${ baseClass }--tools-dynamic`,
  ].join(' ');

const ItemRender = (props) => (
  <div
    className={ getClass(props) }
    onClick={ onClick(props.actions, props.item) }>
    { props.children }
  </div>
);

export const Item = Pure(ItemRender);

Item.propTypes = {
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isActive: PropTypes.bool,
  actions: PropTypes.shape({
    select: PropTypes.func,
  }),
};

export const ItemSection = Pure(
  (props) => (
    <span className="Item__section">
     { props.children }
    </span>
  )
);

export const ItemMain = Pure(
  (props) => (
    <span className="Item__main">
     { props.children }
    </span>
  )
);

export const ItemActions = Pure(
  (props) => (
    <span className="Item__actions">
      { props.children }
    </span>
  )
);
