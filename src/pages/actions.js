import Ramda from 'ramda';

const { find, propEq, pipe, useWith, identity, memoize } = Ramda;

const propEqInt = pipe(
  parseInt,
  propEq('id')
);
export const findById = memoize(useWith(find, [propEqInt, identity]));
