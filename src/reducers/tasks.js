import { createReducer } from './create-reducer';
import Ramda from 'ramda';

import { removeCategoriesTasks } from '../pages/Main/actions';

const create = (title, categoryId) => ({
  title,
  categoryId,
  done: false,
  id: Date.now(),
});

const { lensProp, over, not, indexOf, update, converge, nthArg, pipe } = Ramda;

const toggleDoneProp = over(lensProp('done'), not);
const toggleDone = converge(update, [indexOf, pipe(nthArg(0), toggleDoneProp), nthArg(1)]);

export const tasks = createReducer([], {
  CATEGORIES_REMOVE: (state, { categoryIds }) => removeCategoriesTasks(categoryIds, state),

  TASKS_ADD: (state, { categoryId, title }) => (
    title
      ? [create(title, categoryId), ...state]
      : state
  ),

  TASKS_TOGGLE_DONE: (state, { task }) => toggleDone(task, state),
});
