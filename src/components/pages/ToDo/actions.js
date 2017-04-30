import Ramda from 'ramda';

const { find, propEq, pipe, useWith, identity, memoize } = Ramda;

const propEqInt = pipe(
  parseInt,
  propEq('id')
);
export const findById = memoize(useWith(find, [propEqInt, identity]));

const { update, findIndex, equals, merge } = Ramda;

export const modifyTask = (list, item, changes) => // TODO: copy-paste from CategoryList/actions - only isNew is not cleared
  update(
    findIndex(equals(item), list),
    merge(item, changes),
    list
  );
