import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Category.css';

import { Item, ItemSection, ItemMain, ItemActions } from '../Item';
import { renderButtons } from '../helpers';


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
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    if (this.state.inEdit) {
      this.focus();
    }
  }

  getViewTitleButtons() {
    return renderButtons([
      { name: 'edit', action: this.startEdit.bind(this) },
    ]);
  }

  getEditToolButtons() {
    return renderButtons([
      { name: 'checked', action: this.confirm.bind(this) },
      { name: 'cancel', action: this.cancel.bind(this) },
    ]);
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

  startEdit() {
    this.setState({ inEdit: true }, this.focus);
  }

  endEdit() {
    this.setState({ inEdit: false });
  }

  getViewToolButtons() {
    const { actions, item } = this.props;

    return renderButtons([
      { name: 'remove', action: actions.remove.bind(null, item) },
      { name: 'add', action: actions.addNested.bind(null, item) },
    ]);
  }

  getViewBody() {
    return (
      <ItemMain>
        <ItemSection>{ this.props.item.title }</ItemSection>
        { this.getViewTitleButtons() }
      </ItemMain>
    );
  }

  getEditBody() {
    return (
      <ItemMain>
        <input
          className="Category-input"
          type="text"
          value={ this.state.title }
          onChange={ this.onTitleChange }
          onKeyDown={ this.handleKeyEvent }
          ref={(input) => {
            this.input = input;
          }}/>
      </ItemMain>
    );
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleKeyEvent(event) {
    switch (event.key) {
      case 'Escape':
        this.cancel();
        break;
      case 'Enter':
        this.confirm();
        break;
      default:
    }
  }

  focus() {
    this.input.focus();
  }

  render() {
    const { item, isActive } = this.props;
    const { inEdit } = this.state;

    return (
      <Item
        item={ item }
        isActive={ isActive }
        actions={ inEdit ? this.editActions : this.viewActions }>
        <ItemSection/>
        { inEdit ? this.getEditBody() : this.getViewBody() }
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
