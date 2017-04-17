import { PureComponent } from 'react';

export default (func) =>
  class PureComponentWrap extends PureComponent {
    render() {
      return func(this.props, this.context)
    }
  }
