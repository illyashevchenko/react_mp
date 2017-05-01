import { connect } from 'react-redux';
import Ramda from 'ramda';
import { MainPage as Component } from './Main';

const { useWith, pick, merge, identity } = Ramda;
const storeProps = ['categories', 'category', 'tasks'];
const mapStateToProps = useWith(merge, [pick(storeProps), identity]);

const mapDispatchToProps = (dispatch) => ({
  setCategories: (categories) => dispatch({ type: 'CATEGORIES_SET', list: categories }),
  selectCategory: (category) => dispatch({ type: 'CATEGORIES_SELECT', item: category }),
  setTasks: (tasks) => dispatch({ type: 'TASKS_SET', list: tasks }),
});

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(Component);
