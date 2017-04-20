import React, { PropTypes } from 'react';
import Pure from '../../HOC/Pure';
import './ToDoFilter.css';

// TODO: refactor this
const setItem = (set, filter, prop, eventProp) => // eslint-disable-line max-params
  (event) =>
    set(Object.assign({}, filter, {
      [prop]: event.target[eventProp],
    }));


const ToDoFilter = ({ filter, actions: { set } }) =>
  <div className="ToDoFilter">
    <label className="ToDoFilter__block">
      <input
        type="checkbox"
        className="ToDoFilter__checkbox"
        value={ filter.onlyDone }
        onChange={ setItem(set, filter, 'onlyDone', 'checked') }/>
      Show done
    </label>
    <input
      className="ToDoFilter__block ToDoFilter__input"
      placeholder="Search ..."
      value={ filter.search }
      onChange={ setItem(set, filter, 'search', 'value') }/>
  </div>;

ToDoFilter.PropTypes = {
  filter: PropTypes.shape({
    search: PropTypes.string,
    onlyDone: PropTypes.bool,
  }).isRequired,
  actions: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }),
};

export default Pure(ToDoFilter);
