import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import IconButton from 'material-ui/IconButton';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleAddTodo = (title) => {
    this.props.addTodo({ title });
  }

  handleSetRows = (e, k, v) => {
    this.props.setRows(v);
  }

  handleToggleTodo = (todoId) => {
    this.props.toggleTodo(todoId);
  }

  renderTodo(todo, i) {
    return (
      <tr key={i} selected={todo.get('completed')}>
        <td>
          <i
            onClick={() => this.handleToggleTodo(todo.get('id'))}
            className="material-icons"
          >
            {todo.get('completed') ? 'check_box' : 'check_box_outline_blank'}
          </i>
        </td>
        <td>{todo.get('title')}</td>
        <td>{todo.get('title')}</td>
        <td>{todo.get('title')}</td>
        <td>{todo.get('title')}</td>
        <td>
          {todo.get('percentComplete') ? `${todo.get('percentComplete')}%` : ''}
        </td>
        <td>{todo.get('title')}</td>
      </tr>
    );
  }

  render() {
    const { todos } = this.props;

    return (
      <div className="tbody-ctr">
        <table>
          <tbody>
            {todos.map((todo, i) => this.renderTodo(todo, i))}
          </tbody>
        </table>
      </div>
    );
  }
}

TodoList.propTypes = {
  rows: PropTypes.number,
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  addTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  addTodoDialogOpen: PropTypes.bool,
  openAddTodoDialog: PropTypes.func,
  closeAddTodoDialog: PropTypes.func,
};

export default TodoList;
