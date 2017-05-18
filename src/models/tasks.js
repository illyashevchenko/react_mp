import Ramda from 'ramda';

import { containsObjectProp } from '../models/helpers';

const { useWith, reject, identity } = Ramda;
export const removeByCategoryIds = useWith(reject, [containsObjectProp('categoryId'), identity]);

export const create = (title, categoryId) => ({
  title,
  categoryId,
  done: false,
  id: Date.now(),
});

const { lensProp, over, not, indexOf, update, converge, nthArg, pipe } = Ramda;

const toggleDoneProp = over(lensProp('done'), not);
export const toggleDone = converge(update, [indexOf, pipe(nthArg(0), toggleDoneProp), nthArg(1)]);

const { findIndex, propEq, merge } = Ramda;

export const modify = (list, item, changes) =>
  update(
    findIndex(propEq('id', item.id), list),
    merge(item, changes),
    list
  );


const { test, equals, T } = Ramda;

const stringTest = (string) =>
  test(new RegExp(string, 'ig'));

const whereMatcher = ({ search, onlyDone, categoryId }) => ({
  title: stringTest(search),
  done: onlyDone ? equals(true) : T,
  categoryId: equals(categoryId),
});

const { where, filter } = Ramda;

const matcher = pipe(whereMatcher, where);
export const filtered = useWith(filter, [matcher, identity]);

const { prop } = Ramda;

const completedList = filter(prop('done'));

export const completedPercentage = (list) => {
  const completed = completedList(list).length;
  const all = list.length;

  return Math.round(100 * completed / all);
};

