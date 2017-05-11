import Ramda from 'ramda';

const { curry, contains } = Ramda;
export const containsObjectProp = curry((propName, values, object) =>
  contains(object[propName], values)
);
