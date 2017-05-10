import { createReducer } from './create-reducer';
import Ramda from 'ramda';

import { cleanCategories, removeNew } from '../pages/Main/actions';

const createCategory = (title) => ({
  title,
  id: Date.now(),
});

const { useWith, prepend, identity } = Ramda;
const addRoot = useWith(prepend, [createCategory, identity]);

const createCategoryWithoutTitle = () => ({
  title: '',
  id: Date.now(),
  isNew: true,
});


const { append, over, lensProp, findIndex, equals, adjust, pipe } = Ramda;

const addSubId = pipe(
  prepend,
  over(lensProp('subIds'))
);

const addNested = (parent, list) => {
  const index = findIndex(equals(parent), list);
  const item = createCategoryWithoutTitle();

  const newList = adjust(addSubId(item.id), index, list);

  return append(item, newList);
};

const { prop } = Ramda;
const shouldRemove = prop('isNew');

const { merge, update } = Ramda;
const modifyCategory = (list, item, changes) =>
  update(
    findIndex(equals(item), list),
    merge(item, merge(changes, { isNew: null })),
    list
  );

export const categories = createReducer([], {
  CATEGORIES_REMOVE: (state, { categoryIds, categoryId }) => cleanCategories(categoryIds, categoryId, state),

  CATEGORIES_ADD_ROOT: (state, { title }) => (title ? addRoot(title, state) : state),

  CATEGORIES_ADD_NESTED: (state, { parent }) => addNested(parent, state),

  CATEGORIES_EDIT_CONFIRM: (state, { category, title }) => modifyCategory(state, category, { title }),

  CATEGORIES_EDIT_CANCEL: (state, { category }) => (shouldRemove(category) ? removeNew(category, state) : state),
});
