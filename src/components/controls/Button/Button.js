import React, { PropTypes } from 'react';
import './Button.css';

const baseClass = 'Button';

const getSiblingOnClass = (siblingOn) =>
  siblingOn.map((type) => `${ baseClass }--sibling-on-${ type }`);

const getClass = ({ type = 'default', siblingOn = [], size = 'normal', className }) =>
  [
    baseClass,
    `${ baseClass }--${ type }`,
    `${ baseClass }--${ size }`,
    className,
  ]
    .concat(getSiblingOnClass(siblingOn))
    .join(' ');


const Button = (props) =>
  <button className={ getClass(props) }
          onClick={ props.onClick }>{ props.children }</button>;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  siblingOn: PropTypes.arrayOf(PropTypes.string),
};

export default Button;
