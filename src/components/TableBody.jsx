import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import TableHeaderNav from './TableHeaderNav';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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
          <IconButton
            onClick={() => this.handleToggleTodo(todo.get('id'))}
            iconClassName="material-icons"
          >
            {todo.get('completed') ? 'check_box' : 'check_box_outline_blank'}
          </IconButton>
        </td>
        <td>{todo.get('title')}</td>
        <td>{todo.get('category')}</td>
        <td>{todo.get('status')}</td>
        <td>{todo.get('houre')}</td>
        <td>
          {todo.get('percentComplete') ? `${todo.get('percentComplete')}%` : ''}
        </td>
        <td>{todo.get('note')}</td>
      </tr>
    );
  }

  render() {
    const { rows, todos } = this.props;

    return (
      <div>
        {todos.map((todo, i) => this.renderTodo(todo, i))}
        <div className="todos-table-footer">
          <div className="footer-controls">
            <span>Rows per page:</span>
            <DropDownMenu value={rows} onChange={this.handleSetRows} className="rows-dropdown">
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={10} primaryText="10" />
              <MenuItem value={15} primaryText="15" />
              <MenuItem value={20} primaryText="20" />
              <MenuItem value={25} primaryText="25" />
              <MenuItem value={30} primaryText="30" />
            </DropDownMenu>
          </div>
        </div>
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
