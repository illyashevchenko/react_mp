import { createReducer } from './create-reducer';

export const tasks = createReducer([], {
  TASKS_SET: (state, action) => action.list,
});
