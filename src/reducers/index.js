import { combineReducers } from 'redux';

import { categories, category } from './categories';
import { tasks } from './tasks';

export const godReducer = combineReducers({
  categories,
  category,
  tasks,
});
