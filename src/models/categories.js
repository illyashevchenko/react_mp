import Ramda from 'ramda';

import * as Helpers from './helpers';

const { useWith, reject, identity } = Ramda;
const removeByIds = useWith(reject, [Helpers.containsObjectProp('id'), identity]);

const { curry, evolve, adjust, remove } = Ramda;
const removeFromParent = curry((id, list) => {
  const item = list.find((item) => item.subIds && item.subIds.includes(id));

  if (!item) {
    return list;
  }

  const subIdIndex = item.subIds.indexOf(id);
  const index = list.indexOf(item);

  const removeNested = (item) => evolve({ subIds: remove(subIdIndex, 1) }, item);
  return adjust(removeNested, index, list);
});

const { pipe } = Ramda;

export const clearByIds = (categoryIds, categoryId, categories) => {
  const cleanCategoriesPipe = pipe(
    removeByIds(categoryIds),
    removeFromParent(categoryId)
  );

  return cleanCategoriesPipe(categories);
};

export const removeNew = (category, categories) => {
  const categoryId = category.id;
  const removePipe = pipe(
    removeByIds([categoryId]),
    removeFromParent(categoryId)
  );

  return removePipe(categories);
};

const create = (title) => ({
  title,
  id: Date.now(),
});

const { prepend } = Ramda;
export const addRoot = useWith(prepend, [create, identity]);

const createWithoutTitle = () => ({
  title: '',
  id: Date.now(),
  isNew: true,
});


const { append, over, lensProp, findIndex, equals } = Ramda;

const addSubId = pipe(
  prepend,
  over(lensProp('subIds'))
);

export const addNested = (parent, list) => {
  const index = findIndex(equals(parent), list);
  const item = createWithoutTitle();

  const newList = adjust(addSubId(item.id), index, list);

  return append(item, newList);
};

const { prop } = Ramda;
export const shouldRemove = prop('isNew');

const { merge, update } = Ramda;
export const modify = (list, item, changes) =>
  update(
    findIndex(equals(item), list),
    merge(item, merge(changes, { isNew: null })),
    list
  );

const { nthArg, filter, flatten, reduceBy, pluck } = Ramda;

const createKeysMap = reduceBy(nthArg(1), {}, prop('id'));

const createNestedIds = pipe(
  pluck('subIds'),
  filter(identity),
  flatten
);

const { __ } = Ramda;

const setNested = (keysMap) => {
  const add = (item) => {
    let nested;

    if (item.subIds) {
      nested = item.subIds
        .map(prop(__, keysMap))
        .map(add);
    }

    return Object.assign(item, { nested });
  };

  return add;
};

const { memoize } = Ramda;

export const getTree = memoize((list) => {
  const nestedIds = createNestedIds(list);
  const topLevel = list.filter((item) => nestedIds.indexOf(item.id) === -1);
  const keysMap = createKeysMap(list);

  return topLevel.map(setNested(keysMap));
});

const { flip, propOr } = Ramda;

const getSubIds = pipe(
  flip(Helpers.findById),
  propOr([], 'subIds'),
);

const { map, concat } = Ramda;


const idsToRemoveFromList = curry((list, id) => {
  const get = pipe(
    getSubIds,
    map(idsToRemoveFromList(list)),
    concat([id]),
    flatten
  );

  return get(list, id);
});

export const idsToRemove = flip(idsToRemoveFromList);
