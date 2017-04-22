import React from 'react';
import { IconButton } from '../../controls/IconButton';

import { map } from 'ramda';

const getButton = (button) =>
  <IconButton
    className="Item__button"
    name={ button.name }
    size="small"
    key={ button.name }
    onClick={ button.action }/>;

export const getButtons = map(getButton);
