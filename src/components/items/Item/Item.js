import React, { PropTypes } from 'react';
import './Item.css';

const baseClass = 'Item';

const getClass = ({ size = 'small', isActive }) =>
  [
    baseClass,
    `${ baseClass }--${ size }`,
    isActive ? `${ baseClass }--active` : '',
  ].join(' ');

const Item = (props) => (
  <div
    className={ getClass(props) }>
    { props.children }
  </div>
);


Item.propTypes = {
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isActive: PropTypes.bool,
};
export default Item;
