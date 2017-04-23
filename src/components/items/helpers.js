import React from 'react';
import { IconButton } from '../controls/IconButton/index';

import { map } from 'ramda';

const getButton = (button) => (
  button.action && <IconButton
    className="Item__button"
    name={ button.name }
    size="small"
    key={ button.name }
    onClick={ button.action }/>
);

export const renderButtons = map(getButton);
