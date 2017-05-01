import { createReducer } from './create-reducer';

export const categories = createReducer([], {
  CATEGORIES_SET: (state, action) => action.list,
});

export const category = createReducer(null, {
  CATEGORIES_SELECT: (state, action) => action.item,
});
