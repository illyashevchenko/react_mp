import Ramda from 'ramda'

const { test, equals, T } = Ramda;

const stringTest = (string) =>
  test(new RegExp(string, 'ig'));

const whereMatcher = ({ search, onlyDone, categoryId }) => ({
  title: stringTest(search),
  done: onlyDone ? equals(true) : T,
  categoryId: equals(categoryId),
});

const { pipe, where, useWith, filter, identity } = Ramda;

const matcher = pipe(whereMatcher, where);
export const filtered = useWith(filter, [matcher, identity]);
