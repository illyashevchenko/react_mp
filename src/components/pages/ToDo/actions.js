import Ramda from 'ramda';

const { update, findIndex, equals, merge } = Ramda;

export const modifyTask = (list, item, changes) => // TODO: copy-paste from CategoryList/actions - only isNew is not cleared
  update(
    findIndex(equals(item), list),
    merge(item, changes),
    list
  );
