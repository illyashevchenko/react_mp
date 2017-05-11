import { createReducer } from './create-reducer';
import Ramda from 'ramda';

import { containsObjectProp } from './helpers';

const { useWith, reject, identity } = Ramda;
const removeCategoriesTasks = useWith(reject, [containsObjectProp('categoryId'), identity]);

const create = (title, categoryId) => ({
  title,
  categoryId,
  done: false,
  id: Date.now(),
});

const { lensProp, over, not, indexOf, update, converge, nthArg, pipe } = Ramda;

const toggleDoneProp = over(lensProp('done'), not);
const toggleDone = converge(update, [indexOf, pipe(nthArg(0), toggleDoneProp), nthArg(1)]);

const { findIndex, propEq, merge } = Ramda;

const modifyTask = (list, item, changes) =>
  update(
    findIndex(propEq('id', item.id), list),
    merge(item, changes),
    list
  );

export const tasks = createReducer([], {
  CATEGORIES_REMOVE: (state, { categoryIds }) => removeCategoriesTasks(categoryIds, state),

  TASKS_ADD: (state, { categoryId, title }) => (
    title
      ? [create(title, categoryId), ...state]
      : state
  ),

  TASKS_TOGGLE_DONE: (state, { task }) => toggleDone(task, state),

  TASKS_MODIFY: (state, { task, changes }) => modifyTask(state, task, changes),
});
