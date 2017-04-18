import ramda from 'ramda'

const { test, where, equals, pipe, filter, useWith, identity, T } = ramda;

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

const { lensProp, over, not, indexOf, update, converge, nthArg } = ramda;

const toggleDoneProp = over(lensProp('done'), not);
const toggleDone = converge(update, [indexOf, pipe(nthArg(0), toggleDoneProp), nthArg(1)]);

export default { filtered, create, toggleDone };
