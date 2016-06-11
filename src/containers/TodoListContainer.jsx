import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { appActions, todosActions } from '../actions';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';

class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleAddTodo = (title) => {
    this.props.addTodo({ title });
  }

  render() {
    const { todos, toggleAllTodos } = this.props;

    return (
      <div>
        <TableHeader
          handleToggleAllTodos={toggleAllTodos}
          todos={todos}
          handleAddTodo={this.handleAddTodo}
          title={'Title'}
        />
        <TableBody {...this.props} />
      </div>
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
  toggleAllTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addTodo: todosActions.addTodo,
  removeTodo: todosActions.removeTodo,
  toggleTodo: todosActions.toggleTodo,
  toggleAllTodos: todosActions.toggleAllTodos,
  setRows: appActions.setRows,
})(TodoListContainer);

