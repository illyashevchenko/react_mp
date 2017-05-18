import Ramda from 'ramda';

const { curry, contains } = Ramda;
export const containsObjectProp = curry((propName, values, object) =>
  contains(object[propName], values)
);


const { find, propEq, pipe, useWith, identity, memoize } = Ramda;
const propEqInt = pipe(
  parseInt,
  propEq('id')
);
export const findById = memoize(useWith(find, [propEqInt, identity]));

