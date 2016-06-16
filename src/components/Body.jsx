import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import Row from './Row';

class Body extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { todos } = this.props;

    return (
      <div id="tbody-ctr" className="todos-list__body">
        <table>
          <tbody>
            {todos.map((todo, i) => <Row key={i} todo={todo} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

Body.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
};

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state),
  };
}

export default connect(mapStateToProps)(Body);
