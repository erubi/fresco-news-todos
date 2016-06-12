import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import startCase from 'lodash/startCase';

class TodoRow extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      popOverOpen: false,
    };
  }

  handleToggleTodo = (e, todoId) => {
    e.stopPropagation();
    this.props.toggleTodo(todoId);
  }

  handleUpdateTodo = (data) => {
    const { todo, updateTodo } = this.props;
    this.setState({ popOverOpen: false }, () => updateTodo(todo.get('id'), data));
  }

  handlePopOverOpen = (event, attr, type) => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      popOverOpen: true,
      anchorEl: event.currentTarget,
      popOverAttr: attr,
      popOverType: type,
    });
  };

  handlePopOverClose = () => {
    this.setState({
      popOverOpen: false,
    });
  };

  renderInputPopOver = (attr, inputType) => (
    <div className="input-popover">
      <h3>{startCase(attr)}</h3>

      <div className="input">
        <input
          maxLength="10"
          autoFocus
          ref="popOverInput"
          type={inputType || 'text'}
        />
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
          [attr]: this.refs.popOverInput.value,
        })}
      />
    </div>
  );

  renderMenuPopOver = (attr) => (
    <Menu onChange={(e, v) => this.handleUpdateTodo({ [attr]: v })}>
      <MenuItem value={"Home"} primaryText="Home" />
      <MenuItem value={"Work"} primaryText="Work" />
      <MenuItem value={"Life"} primaryText="Life" />
    </Menu>
  );

  renderPopOver = () => (
    <Popover
      open={this.state.popOverOpen}
      anchorEl={this.state.anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      onRequestClose={this.handlePopOverClose}
    >
      {this.state.popOverType === 'menu'
        ? this.renderMenuPopOver(this.state.popOverAttr, this.state.popOverType)
        : this.renderInputPopOver(this.state.popOverAttr, this.state.popOverType)}
    </Popover>
  );

  renderCheckBox(todo) {
    if (todo.get('completed')) {
      return (
        <i
          onClick={(e) => this.handleToggleTodo(e, todo.get('id'))}
          style={{ color: '#0047bb' }}
          className="material-icons"
        >
          check_box
        </i>
      );
    }

    return (
      <i
        onClick={(e) => this.handleToggleTodo(e, todo.get('id'))}
        className="material-icons"
      >
        check_box_outline_blank
      </i>
    );
  }

  render() {
    const { todo, selectTodo, selected } = this.props;
    const className = selected ? 'selected-todo' : '';

    return (
      <tr
        className={className}
        onClick={() => selectTodo(todo.get('id'))}
      >
        <td>
          {this.renderPopOver()}
          {this.renderCheckBox(todo)}
        </td>
        <td onClick={(e) => this.handlePopOverOpen(e, 'title', 'text')}>
          {todo.get('title')}
        </td>
        <td onClick={(e) => this.handlePopOverOpen(e, 'category', 'menu')}>
          <span className="cell-text">{todo.get('category') || 'null'}</span>
          <i className="material-icons">arrow_drop_down</i>
        </td>
        <td onClick={(e) => this.handlePopOverOpen(e, 'status', 'text')}>
          {todo.get('status') || 'null'}
        </td>
        <td onClick={(e) => this.handlePopOverOpen(e, 'hours', 'number')}>
          {todo.get('hours') || 'null'}
        </td>
        <td onClick={(e) => this.handlePopOverOpen(e, 'percentComplete', 'number')}>
          {todo.get('percentComplete') ? `${todo.get('percentComplete')}%` : 'null'}
        </td>
        <td onClick={(e) => this.handlePopOverOpen(e, 'note', 'text')}>
          {todo.get('note') || 'null'}
        </td>
      </tr>
    );
  }
}

TodoRow.propTypes = {
  todo: PropTypes.instanceOf(Immutable.Map),
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  selectTodo: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default TodoRow;

