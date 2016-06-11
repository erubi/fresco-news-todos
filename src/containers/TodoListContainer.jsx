import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { appActions, todosActions } from '../actions';
import TodoList from '../components/TodoList';

class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <TodoList {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state),
    rows: state.getIn(['app', 'rows']),
  };
}


TodoListContainer.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List),
};

export default connect(mapStateToProps, {
  addTodo: todosActions.addTodo,
  removeTodo: todosActions.removeTodo,
  setRows: appActions.setRows,
})(TodoListContainer);

