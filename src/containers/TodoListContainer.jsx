import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { appActions, todosActions } from '../actions';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import TableFooter from '../components/TableFooter';

class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleAddTodo = (title) => {
    this.props.addTodo({ title });
  }

  render() {
    const {
      todos,
      toggleAllTodos,
      setRows,
      rows,
      page,
      nextPage,
      prevPage,
      totalNumTodos,
    } = this.props;

    return (
      <div>
        <TableHeader
          handleToggleAllTodos={toggleAllTodos}
          todos={todos}
          handleAddTodo={this.handleAddTodo}
          title={'Title'}
        />
        <TableBody {...this.props} />
        <TableFooter
          prevPage={prevPage}
          nextPage={nextPage}
          visibleNumTodos={todos.size}
          totalNumTodos={totalNumTodos}
          setRows={setRows}
          rows={rows}
          page={page}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state),
    totalNumTodos: state.get('todos').size,
    rows: state.getIn(['app', 'rows']),
    page: state.getIn(['app', 'page']),
  };
}

TodoListContainer.propTypes = {
  rows: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalNumTodos: PropTypes.number.isRequired,
  todos: PropTypes.instanceOf(Immutable.List),
  toggleAllTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addTodo: todosActions.addTodo,
  removeTodo: todosActions.removeTodo,
  updateTodo: todosActions.updateTodo,
  toggleTodo: todosActions.toggleTodo,
  toggleAllTodos: todosActions.toggleAllTodos,
  setRows: appActions.setRows,
  prevPage: appActions.prevPage,
  nextPage: appActions.nextPage,
})(TodoListContainer);

