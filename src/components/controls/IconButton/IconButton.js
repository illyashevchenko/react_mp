import React from 'react';
import PropTypes from 'prop-types';

import './IconButton.css';

import { Icon } from '../Icon';
import { Button } from '../Button';

import { Pure } from '../../HOC/Pure';


const createClicker = (onClick) =>
  (event) => {
    event.stopPropagation();
    onClick(event)
  };

const IconButtonRender = (props) =>
  <Button type="default"
          { ...props }
          onClick={ createClicker(props.onClick) }>
    <Icon { ...props }/>
  </Button>;

IconButtonRender.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export const IconButton = Pure(IconButtonRender);
