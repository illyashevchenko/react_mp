import Ramda from 'ramda'

const { nthArg, pipe, identity, filter, flatten, reduceBy, pluck, prop } = Ramda;

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

const getTree = (list) => {
  const nestedIds = createNestedIds(list);
  const topLevel = list.filter((item) => nestedIds.indexOf(item.id) === -1);
  const keysMap = createKeysMap(list);

  return topLevel.map(setNested(keysMap));
};


const createCategory = (title) => ({
  title,
  id: Date.now(),
});

const { useWith, prepend } = Ramda;
const addCategory = useWith(prepend, [createCategory, identity]);

const createCategoryWithoutTitle = () => ({
  title: '',
  id: Date.now(),
  isNew: true,
});


const { append, over, lensProp, findIndex, equals, adjust } = Ramda;

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

const shouldRemove = prop('isNew');

const { merge, update } = Ramda;

const modifyCategory = (list, item, changes) =>
  update(
    findIndex(equals(item), list),
    merge(item, merge(changes, { isNew: null })),
    list
  );

const { memoize } = Ramda;

export default {
  getTree: memoize(getTree),
  addCategory,
  addNested,
  shouldRemove,
  modifyCategory,
};
