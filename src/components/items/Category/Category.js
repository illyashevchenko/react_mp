import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Category.css';

import { Item, ItemSection, ItemMain, ItemActions } from '../Item';
import { getButtons } from './helpers';


export class Category extends PureComponent {
  constructor(props) {
    super(props);

    const { item, actions } = props;

    this.state = {
      title: item.title,
      inEdit: item.isNew,
    };

    this.viewActions = {
      select: actions.select,
    };
    this.editActions = {};

    this.onTitleChange = this.onTitleChange.bind(this);
  }

  getViewTitleButtons() {
    return getButtons([
      { name: 'edit', action: this.startEdit.bind(this) },
    ]);
  }

  getEditToolButtons() {
    return getButtons([
      { name: 'checked', action: this.confirm.bind(this) },
      { name: 'cancel', action: this.cancel.bind(this) },
    ]);
  }

  getViewToolButtons() {
    const { actions } = this.props;

    return getButtons([
      { name: 'remove', action: actions.remove },
      { name: 'add', action: actions.addNested },
    ]);
  }

  startEdit() {
    this.setState({ inEdit: true });
  }

  endEdit() {
    this.setState({ inEdit: false });
  }

  confirm() {
    const { title } = this.state;
    if (!title) {
      return;
    }

    const { item, actions } = this.props;

    actions.confirm(item, title);
    this.endEdit();
  }

  cancel() {
    const { item, actions } = this.props;

    actions.cancel(item);

    this.setState({
      title: item.title,
    });
    this.endEdit();
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  getEditBody() {
    return (
      <ItemMain>
        <input
          type="text"
          style={ { width: '100%' } }
          value={ this.state.title }
          onChange={ this.onTitleChange }/>
      </ItemMain>
    );
  }

  getViewBody() {
    return (
      <ItemMain>
        <ItemSection>{ this.props.item.title }</ItemSection>
        { this.getViewTitleButtons() }
      </ItemMain>
    );
  }

  render() {
    const { item, isActive } = this.props;
    const { inEdit } = this.state;

    return (
      <Item
        { ...{ item, isActive } }
        actions={ inEdit ? this.editActions : this.viewActions }>
        <ItemSection/>
        {
          inEdit
            ? this.getEditBody()
            : this.getViewBody()
        }
        <ItemActions>
          { inEdit ? this.getEditToolButtons() : this.getViewToolButtons() }
        </ItemActions>
      </Item>
    );
  }
}

Category.propTypes = {
  item: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    select: PropTypes.func.isRequired,
  }),
};
