import React, { PropTypes } from 'react';
import './IconButton.css';

import Icon from '../Icon/Icon.js';
import Button from '../Button/Button.js';

const createClicker = (onClick) =>
  (event) => {
    event.stopPropagation();
    onClick(event)
  };

const IconButton = ({ name, onClick }) =>
  <Button type="default"
          onClick={ createClicker(onClick) }>
      <Icon name={ name }/>
  </Button>;

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
export default IconButton;
