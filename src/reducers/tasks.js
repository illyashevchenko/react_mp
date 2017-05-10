import { createReducer } from './create-reducer';

import { removeCategoriesTasks } from '../pages/Main/actions';


export const tasks = createReducer([], {
  TASKS_SET: (state, action) => action.list,

  CATEGORIES_REMOVE: (state, { categoryIds }) => removeCategoriesTasks(categoryIds, state),
});
