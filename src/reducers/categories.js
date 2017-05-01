import { createReducer } from './create-reducer';

export const categories = createReducer([], {
  CATEGORIES_SET: (state, action) => action.list,
});
