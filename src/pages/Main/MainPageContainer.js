import { connect } from 'react-redux';
import Ramda from 'ramda';
import { MainPage as Component } from './Main';

const { useWith, pick, merge, identity } = Ramda;
const storeProps = ['categories', 'tasks'];
const mapStateToProps = useWith(merge, [pick(storeProps), identity]);

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
