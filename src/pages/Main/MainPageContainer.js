import { connect } from 'react-redux';
import Ramda from 'ramda';
import { MainPage as Component } from './Main';

const { useWith, pick, merge, identity } = Ramda;
const storeProps = ['categories', 'category', 'tasks'];
const mapStateToProps = useWith(merge, [pick(storeProps), identity]);

const mapDispatchToProps = (dispatch) => ({
  setCategories: (categories) => dispatch({ type: 'CATEGORIES_SET', categories }),
  selectCategory: (category) => dispatch({ type: 'CATEGORIES_SELECT', category }),
  setTasks: (tasks) => dispatch({ type: 'TASKS_SET', tasks }),
});

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(Component);
