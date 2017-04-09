import { test, where, equals, pipe, filter, useWith, identity, T } from 'ramda'

const stringTest = (string) =>
  test(new RegExp(string, 'ig'));

const whereMatcher = ({ search, onlyDone, categoryId }) => ({
  title: stringTest(search),
  done: onlyDone ? equals(true) : T,
  categoryId: equals(categoryId),
});

const matcher = pipe(whereMatcher, where);
const filtered = useWith(filter, [matcher, identity]);


const create = (title, category) => ({
  title,
  categoryId: category.id,
  done: false,
  id: Date.now(),
});

export default { filtered, create };
