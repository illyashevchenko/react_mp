import ramda from 'ramda';

const { filter, prop } = ramda;

const completedList = filter(prop('done'));
export const completedPercentage = (tasks) => {
  const completed = completedList(tasks).length;
  const all = tasks.length;

  return Math.round(100 * completed / all);
};

const {
  reject, propEq, useWith, identity, pipe, contains, flip, propOr, curry,
  find, map, flatten, concat, adjust, remove, evolve,
} = ramda;


const findById = flip(useWith(find, [propEq('id'), identity]));
const getSubIds = pipe(
  findById,
  propOr([], 'subIds'),
);


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

export const removeFromParent = (id, list) => {
  const item = list.find((item) => item.subIds && item.subIds.includes(id));

  if (!item) {
    return list;
  }

  const subIdIndex = item.subIds.indexOf(id);
  const index = list.indexOf(item);

  const removeNested = (item) => evolve({ subIds: remove(subIdIndex, 1) }, item);
  return adjust(removeNested, index, list);
};

const containsObjectProp = curry((propName, values, object) =>
  contains(object[propName], values)
);

export const removeCategoriesTasks = useWith(reject, [containsObjectProp('categoryId'), identity]);
export const removeByIds = useWith(reject, [containsObjectProp('id'), identity]);

export const removeCategory = (category, categories, tasks) => {
  const categoryId = category.id;
  const toRemove = idsToRemove(categoryId, categories);

  const cleanedCategories = removeByIds(toRemove, categories);

  return {
    categories: removeFromParent(category.id, cleanedCategories),
    tasks: removeCategoriesTasks(toRemove, tasks),
  };
};

