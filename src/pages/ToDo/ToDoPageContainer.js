import { connect } from 'react-redux';
import Ramda from 'ramda';
import { ToDoPage as Component } from './ToDo';

const { useWith, pick, merge, identity } = Ramda;
const storeProps = ['categories', 'tasks'];
const mapStateToProps = useWith(merge, [pick(storeProps), identity]);

const mapDispatchToProps = (dispatch) => ({
  actions: {
    modifyTask: (task, changes) => dispatch({ type: 'TASKS_MODIFY', task, changes }),
  },
});

export const ToDoPage = connect(mapStateToProps, mapDispatchToProps)(Component);
