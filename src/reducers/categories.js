import { createReducer } from './create-reducer';
import * as Categories from '../models/categories';

export const categories = createReducer([], {
  CATEGORIES_REMOVE: (state, { categoryIds, categoryId }) => Categories.clearByIds(categoryIds, categoryId, state),

  CATEGORIES_ADD_ROOT: (state, { title }) => (title ? Categories.addRoot(title, state) : state),

  CATEGORIES_ADD_NESTED: (state, { parent }) => Categories.addNested(parent, state),

  CATEGORIES_EDIT_CONFIRM: (state, { category, title }) => Categories.modify(state, category, { title }),

  CATEGORIES_EDIT_CANCEL: (state, { category }) => (
    Categories.shouldRemove(category)
      ? Categories.removeNew(category, state)
      : state
  ),
});
