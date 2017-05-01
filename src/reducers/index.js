import { combineReducers } from 'redux';

import { categories } from './categories';
import { tasks } from './tasks';

export const godReducer = combineReducers({
  categories,
  tasks,
});
