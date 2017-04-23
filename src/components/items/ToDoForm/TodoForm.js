import React from 'react';
import PropTypes from 'prop-types';

import './TodoForm.css';

import { Pure } from '../../HOC/Pure';

// import { Item } from '../Item';
// import { IconButton } from '../../controls/IconButton';

const ToDoFormRender = ({ item }) => (
  <div className="ToDoForm">
    Will update task [{ item.id }] with title '{ item.title }'
  </div>
);

export const ToDoForm = Pure(ToDoFormRender);

ToDoForm.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.shape({}),
};
