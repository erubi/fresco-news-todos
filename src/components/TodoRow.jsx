import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DropDownMenu from 'material-ui/DropDownMenu';
import Immutable from 'immutable';
import MenuItem from 'material-ui/MenuItem';

class TodoRow extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleToggleTodo = (todoId) => {
    this.props.toggleTodo(todoId);
  }

  handleUpdateTodo = (todoId, data) => {
    this.props.updateTodo(todoId, data);
  }

  render() {
    const { todo } = this.props;
    const handleOnChange = (data) => this.handleUpdateTodo(todo.get('id'), data);

    return (
      <tr>
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
}

TodoRow.propTypes = {
  todo: PropTypes.instanceOf(Immutable.Map),
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoRow;

