import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

import { Pure } from '../../HOC/Pure';

const baseClass = 'Item';

const onClick = (select, item) =>
select && ((event) => {
  select(item);
  event.stopPropagation();
});

const getClass = ({ size = 'small', isActive }) =>
  [
    baseClass,
    `${ baseClass }--${ size }`,
    isActive ? `${ baseClass }--active` : '',
  ].join(' ');

const ItemRender = (props) => (
  <div
    className={ getClass(props) }
    onClick={ onClick(props.actions.select, props.item) }>
    { props.children }
  </div>
);


ItemRender.propTypes = {
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isActive: PropTypes.bool,
  actions: PropTypes.shape({
    select: PropTypes.func,
  }),
};

export const Item = Pure(ItemRender);
