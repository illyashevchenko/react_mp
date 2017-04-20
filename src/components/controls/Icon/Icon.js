import React from 'react';
import PropTypes from 'prop-types';

import './Icon.css';

const baseClass = 'Icon';
const getClass = ({ className, size = 'small' }) =>
  [
    className,
    baseClass,
    `${ baseClass }--${ size }`,
  ].join(' ');

const Icon = (props) =>
  <svg className={ getClass(props) }>
    <use xlinkHref={ `#${ props.name }` }/>
  </svg>;

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default Icon;
