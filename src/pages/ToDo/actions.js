import Ramda from 'ramda';

const { useWith, assoc, prop, identity } = Ramda;

export const setCategory = useWith(assoc('categoryId'), [prop('id'), identity]);
