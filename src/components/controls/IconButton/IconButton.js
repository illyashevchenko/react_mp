import React, { PropTypes } from 'react';
import './IconButton.css';

import Icon from '../Icon';
import Button from '../Button';

const createClicker = (onClick) =>
  (event) => {
    event.stopPropagation();
    onClick(event)
  };

const IconButton = (props) =>
  <Button type="default"
          { ...props }
          onClick={ createClicker(props.onClick) }>
    <Icon { ...props }/>
  </Button>;

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};
export default IconButton;
