import React, { PropTypes } from 'react';
import './Button.css';

const baseClass = 'Button';

const getSiblingOnClass = (siblingOn) =>
  siblingOn.map((type) => `${ baseClass }--sibling-on-${ type }`);

const getClass = (type = 'default', siblingOn = []) =>
  `${ baseClass } ${ baseClass }--${ type } ${ getSiblingOnClass(siblingOn) }`;


const Button = ({ onClick, children, type, siblingOn }) =>
  <button className={ getClass(type, siblingOn) }
          onClick={ onClick }>{ children }</button>;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  siblingOn: PropTypes.arrayOf(PropTypes.string),
};

export default Button;
