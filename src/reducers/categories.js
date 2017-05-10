import { createReducer } from './create-reducer';
import { pipe } from 'ramda';

import { removeByIds, removeFromParent } from '../pages/Main/actions';

export const categories = createReducer([], {
  CATEGORIES_SET: (state, action) => action.list,

  CATEGORIES_REMOVE: (state, { categoryIds, categoryId }) => {
    const cleanCategories = pipe(
      removeByIds(categoryIds),
      removeFromParent(categoryId)
    );

    return cleanCategories(state);
  },
});
