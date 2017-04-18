import {
  __, memoize, nthArg, pipe, flip, useWith, identity,
  prepend, filter, flatten,
  reduceBy, pluck, prop,
} from 'ramda'

const createKeysMap = reduceBy(nthArg(1), {}, (item) => item.id);

const createNestedIds = pipe(
  pluck('subIds'),
  filter(identity),
  flatten
);


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

const addCategory = useWith(prepend, [createCategory, identity]);

export default {
  getTree: memoize(getTree),
  addCategory: flip(addCategory),
};
