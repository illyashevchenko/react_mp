import { connect } from 'react-redux';
import Ramda from 'ramda';
import { ToDoPage as Component } from './ToDo';

const { pick } = Ramda;
const storeProps = ['categories', 'tasks'];
const mapStateToProps = pick(storeProps);

const mapDispatchToProps = (dispatch) => ({
  actions: {
    modifyTask: (task, changes) => dispatch({ type: 'TASKS_MODIFY', task, changes }),
  },
});

export const ToDoPage = connect(mapStateToProps, mapDispatchToProps)(Component);
