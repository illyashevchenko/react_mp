import React, { PureComponent } from 'react';
import './Category.css';

import { merge } from 'ramda';

import CategoryBase from './CategoryBase';

class Category extends PureComponent {
  constructor(props) {
    super(props);

    this.edit = merge(this.edit, {
      getTitle: this.getTitle.bind(this),
      actions: {
        confirm: this.confirm.bind(this),
        cancel: this.cancel.bind(this),
      },
    });

    this.view = merge(this.view, {
      actions: {
        edit: this.startEdit.bind(this),
      },
    });

    this.onTitleChange = this.onTitleChange.bind(this);

    this.state = {
      title: props.item.title,
      inEdit: false,
    };
  }

  view = {
    buttons: {
      title: [
        { name: 'edit', action: 'edit' },
      ],
      tools: [
        { name: 'remove', action: 'remove' },
        { name: 'add', action: 'addNested' },
      ],
    },
  };

  edit = {
    buttons: {
      tools: [
        { name: 'checked', action: 'confirm' },
        { name: 'cancel', action: 'cancel' },
      ],
    },
  };

  getTitle() {
    return (
      <input
        style={ { width: '100%' } }
        value={ this.state.title }
        onChange={ this.onTitleChange }/>
    );
  }

  startEdit() {
    this.setState({ inEdit: true });
  }

  endEdit() {
    this.setState({ inEdit: false });
  }

  confirm(item) {
    this.props.actions.confirm(item, this.state.title);
    this.endEdit();
  }

  cancel(item) {
    this.props.actions.cancel(item);
    this.setState({
      title: this.props.item.title,
    });
    this.endEdit();
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  extendBase(configName) {
    const config = this[configName];

    const propsActions = this.props.actions;
    const props = merge(this.props, config);

    if (config.actions) {
      props.actions = merge(propsActions, config.actions);
    }

    return CategoryBase(props);
  }

  render() {
    return this.state.inEdit
      ? this.extendBase('edit')
      : this.extendBase('view')
  }
}

export default Category;
