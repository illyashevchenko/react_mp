import { connect } from 'react-redux';
import Ramda from 'ramda';
import { createSelector } from 'reselect';

import { MainPage as Component } from './Main';

import * as Tasks from '../../models/tasks';

const { prop } = Ramda;
const getTasks = prop('tasks');

// Selectors
const getCompleted = createSelector(
  getTasks,
  Tasks.completedList
);

const getCompletedPercentage = createSelector(
  [getTasks, getCompleted],
  (tasks, completed) =>
    Math.round(100 * completed.length / tasks.length)
);


const mapStateToProps = (state) => ({
  categories: state.categories,
  tasks: state.tasks, // todo: since filter is only in url, not inside state
  completedPercentage: getCompletedPercentage(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    tasks: {
      add: (categoryId, title) => dispatch({ type: 'TASKS_ADD', categoryId, title }),
      toggleDone: (task) => dispatch({ type: 'TASKS_TOGGLE_DONE', task }),
    },
    categories: {
      remove: (categoryId, categoryIds) => dispatch({ type: 'CATEGORIES_REMOVE', categoryIds, categoryId }),
      addNested: (parent) => dispatch({ type: 'CATEGORIES_ADD_NESTED', parent }),
      addRoot: (title) => dispatch({ type: 'CATEGORIES_ADD_ROOT', title }),
      editConfirm: (category, title) => dispatch({ type: 'CATEGORIES_EDIT_CONFIRM', category, title }),
      editCancel: (category) => dispatch({ type: 'CATEGORIES_EDIT_CANCEL', category }),
    },
  },
});

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(Component);
