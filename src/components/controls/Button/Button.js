import React, { PropTypes } from 'react';
import './Button.css';

const Button = (props) =>
  <button className={ 'Button ' + props.className }
          onClick={ props.onClick }>{ props.children }</button>;

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
