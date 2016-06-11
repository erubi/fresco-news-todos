import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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

  handleUpdateTodo = (todoId, data) => {
    this.props.updateTodo(todoId, data);
  }

  renderTodo(todo, i) {
    const handleOnChange = (data) => this.handleUpdateTodo(todo.get('id'), data);
    return (
      <tr key={i} selected={todo.get('completed')}>
        <td>
          <div>
            <i
              onClick={() => this.handleToggleTodo(todo.get('id'))}
              className="material-icons"
            >
              {todo.get('completed') ? 'check_box' : 'check_box_outline_blank'}
            </i>
          </div>
        </td>
        <td><div>{todo.get('title')}</div></td>
        <td>
          <div>
            <DropDownMenu
              ref="category"
              value={todo.get('category')}
              onChange={(e, k, v) => handleOnChange({ category: v })}
              className="category-dropdown"
            >
              <MenuItem value={"Home"} primaryText="Home" />
              <MenuItem value={"Work"} primaryText="Work" />
              <MenuItem value={"Life"} primaryText="Life" />
            </DropDownMenu>
          </div>
        </td>
        <td><div>{todo.get('status')}</div></td>
        <td><div>{todo.get('hours')}</div></td>
        <td>
          <div>{todo.get('percentComplete') ? `${todo.get('percentComplete')}%` : ''}</div>
        </td>
        <td><div>{todo.get('note')}</div></td>
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
  updateTodo: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  addTodoDialogOpen: PropTypes.bool,
  openAddTodoDialog: PropTypes.func,
  closeAddTodoDialog: PropTypes.func,
};

export default TodoList;
