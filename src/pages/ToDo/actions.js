import Ramda from 'ramda';

const { update, findIndex, propEq, merge } = Ramda;

export const modifyTask = (list, item, changes) =>
  update(
    findIndex(propEq('id', item.id), list),
    merge(item, changes),
    list
  );

const { useWith, assoc, prop, identity } = Ramda;

export const setCategory = useWith(assoc('categoryId'), [prop('id'), identity]);
