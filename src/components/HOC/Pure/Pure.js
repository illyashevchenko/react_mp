import { PureComponent } from 'react';

export const Pure = (func) =>
  class extends PureComponent {
    // TODO: it is not working for some reason
    static propTypes = func.propTypes;

    render() {
      return func(this.props, this.context)
    }
  };
