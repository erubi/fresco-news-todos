import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DropDownMenu from 'material-ui/DropDownMenu';
import Immutable from 'immutable';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';

class TodoRow extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      popOverOpen: false,
    };
  }

  handleToggleTodo = (todoId) => {
    this.props.toggleTodo(todoId);
  }

  handleUpdateTodo = (data) => {
    const { todo, updateTodo } = this.props;
    this.setState({ popOverOpen: false }, () => updateTodo(todo.get('id'), data));
  }

  handlePopOverOpen = (event, attr) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popOverOpen: true,
      anchorEl: event.currentTarget,
      popOverAttr: attr,
    });
  };

  handlePopOverClose = () => {
    this.setState({
      popOverOpen: false,
    });
  };

  renderPopOver = () => (
    <Popover
      open={this.state.popOverOpen}
      className="todo-attr-popover"
      anchorEl={this.state.anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      onRequestClose={this.handleRequestClose}
    >
      <div>{this.state.popOverAttr}</div>
      <div className="input">
        <input maxLength="10" ref="popOverInput" type="text"></input>
      </div>
      <FlatButton
        key={'cancel'}
        label="Cancel"
        style={{ color: '#0047bb' }}
        onTouchTap={this.handlePopOverClose}
      />
      <FlatButton
        key={'save'}
        label="Save"
        style={{ color: '#0047bb' }}
        onTouchTap={() => this.handleUpdateTodo({
          [this.state.popOverAttr]: this.refs.popOverInput.value,
        })}
      />
    </Popover>
  );

  render() {
    const { todo } = this.props;
    const handleOnChange = (data) => this.handleUpdateTodo(data);

    return (
      <tr>
        <td>
          {this.renderPopOver()}
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
        <td>
          <div onClick={(e) => this.handlePopOverOpen(e, 'status')}>
            {todo.get('status') || 'null'}
          </div>
        </td>
        <td><div>{todo.get('hours') || 'null'}</div></td>
        <td>
          <div>{todo.get('percentComplete') ? `${todo.get('percentComplete')}%` : 'null'}</div>
        </td>
        <td><div>{todo.get('note') || 'null'}</div></td>
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

