import React from 'react';
import PropTypes from 'prop-types';

import './Icon.css';

import { Pure } from '../../HOC/Pure';

const baseClass = 'Icon';
const getClass = ({ className, size = 'small' }) =>
  [
    className,
    baseClass,
    `${ baseClass }--${ size }`,
  ].join(' ');

const IconRender = (props) =>
  <svg className={ getClass(props) }>
    <use xlinkHref={ `#${ props.name }` }/>
  </svg>;

IconRender.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export const Icon = Pure(IconRender);
