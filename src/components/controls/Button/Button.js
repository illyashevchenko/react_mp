import React from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';

import './Button.css';

import { Pure } from '../../HOC/Pure';

const baseClass = 'Button';

const getSiblingOnClass = (siblingOn) =>
  siblingOn.map((type) => `${ baseClass }--sibling-on-${ type }`);

const getClass = ({ type = 'default', siblingOn = [], size = 'middle', className, disabled }) =>
  [
    baseClass,
    `${ baseClass }--${ type }`,
    `${ baseClass }--${ size }`,
    disabled && `${ baseClass }--disabled`,
    className,
  ]
    .concat(getSiblingOnClass(siblingOn))
    .filter(identity)
    .join(' ');


const ButtonRender = (props) =>
  <button
    className={ getClass(props) }
    type="button"
    onClick={ !props.disabled && props.onClick }>{ props.children }</button>;

ButtonRender.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  siblingOn: PropTypes.arrayOf(PropTypes.string),
};

export const Button = Pure(ButtonRender);
