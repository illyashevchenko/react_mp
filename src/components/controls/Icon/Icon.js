import React, { PropTypes } from 'react';
import './Icon.css';

const Icon = ({ name, className }) =>
  <svg className={ className }>
    <use xlinkHref={ `#${ name } `}/>
  </svg>;

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Icon;
