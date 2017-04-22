import React from 'react';
import { IconButton } from '../../controls/IconButton';

import { curry } from 'ramda';

const getAction = (action, { actions, item }) =>
  () => actions[action](item);

const getButton = curry((props, button) =>
  <IconButton
    className="Item__button"
    name={ button.name }
    size="small"
    key={ button.action }
    onClick={ getAction(button.action, props) }/>
);

export const getButtons = (props, buttons) =>
  buttons.map(getButton(props));
