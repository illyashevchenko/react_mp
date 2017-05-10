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

const { memoize } = Ramda;

export default {
  getTree: memoize(getTree),
};
