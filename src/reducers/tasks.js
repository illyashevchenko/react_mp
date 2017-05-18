import { createReducer } from './create-reducer';
import * as Tasks from '../models/tasks';

export const tasks = createReducer([], {
  CATEGORIES_REMOVE: (state, { categoryIds }) => Tasks.removeByCategoryIds(categoryIds, state),

  TASKS_ADD: (state, { categoryId, title }) => (
    title
      ? [Tasks.create(title, categoryId), ...state]
      : state
  ),

  TASKS_TOGGLE_DONE: (state, { task }) => Tasks.toggleDone(task, state),

  TASKS_MODIFY: (state, { task, changes }) => Tasks.modify(state, task, changes),
});
