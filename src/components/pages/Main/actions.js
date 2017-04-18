import ramda from 'ramda';

const { filter, prop } = ramda;

const completedList = filter(prop('done'));
const completedPercentage = (tasks) => {
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


const idsToRemove = curry((list, id) => {
  const get = pipe(
    getSubIds,
    map(idsToRemove(list)),
    concat([id]),
    flatten
  );

  return get(list, id);
});

const removeFromParent = (id, list) => {
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

const removeByIds = useWith(reject, [containsObjectProp('id'), identity]);

const removeCategory = (item, list) => {
  const withoutSub = removeFromParent(item.id, list);
  const toRemove = idsToRemove(list, item.id);

  return removeByIds(toRemove, withoutSub);
};

const removeCategoriesTasks = useWith(reject, [containsObjectProp('categoryId'), identity]);

export default {
  completedPercentage,
  removeCategory,
  removeFromParent,
  idsToRemove: flip(idsToRemove),
  removeByIds,
  removeCategoriesTasks,
};
