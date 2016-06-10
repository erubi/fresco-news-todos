import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { appActions, todosActions } from '../actions';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <h1>ListContainer</h1>
      </div>
    );
  }
}

export default ListContainer;

// export default connect(mapStateToProps, {})

