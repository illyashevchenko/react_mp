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

const whereMatcher = ({ search, showDone, categoryId }) => ({
  title: stringTest(search),
  done: showDone ? T : equals(false),
  categoryId: equals(categoryId),
});

const { where, filter, memoize } = Ramda;

const matcher = pipe(whereMatcher, where);
export const filtered = memoize(useWith(filter, [matcher, identity]));

const { prop } = Ramda;

export const completedList = filter(prop('done'));
