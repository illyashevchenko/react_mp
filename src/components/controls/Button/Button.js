import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

import { Pure } from '../../HOC/Pure';

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


const ButtonRender = (props) =>
  <button className={ getClass(props) }
          onClick={ props.onClick }>{ props.children }</button>;

ButtonRender.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  siblingOn: PropTypes.arrayOf(PropTypes.string),
};

export const Button = Pure(ButtonRender);
