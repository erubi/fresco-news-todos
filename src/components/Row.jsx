import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { todosActions } from '../actions';
import Immutable from 'immutable';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import startCase from 'lodash/startCase';

class Row extends Component {
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

  handleUpdateTodo = (e, data) => {
    if(e) e.preventDefault();
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

  renderInputPopOver(attr, inputType) {
    return (
      <div className="popover">
        <h3>{startCase(attr)}</h3>

        <div>
          <form
            onSubmit={(e) => this.handleUpdateTodo(e, {
              [attr]: this.refs.popOverInput.value,
            })}
          >
            <input
              className="popover__input"
              maxLength="10"
              placeholder={inputType === 'number' ? 'Input number here' : 'Input text here'}
              autoFocus
              ref="popOverInput"
              defaultValue={this.props.todo.get(attr)}
              type={inputType || 'text'}
            />
          </form>
        </div>
        <FlatButton
          className="popover__button"
          key={'save'}
          label="Save"
          onTouchTap={() => this.handleUpdateTodo(null, {
            [attr]: this.refs.popOverInput.value,
          })}
        />
        <FlatButton
          className="popover__button"
          key={'cancel'}
          label="Cancel"
          onTouchTap={this.handlePopOverClose}
        />
      </div>
    );
  }

  renderMenuPopOver(attr) {
    return (
      <Menu
        value={this.props.todo.get('attr')}
        onChange={(e, v) => this.handleUpdateTodo(null, { [attr]: v })}
      >
        <MenuItem value={"Home"} primaryText="Home" />
        <MenuItem value={"Work"} primaryText="Work" />
        <MenuItem value={"Life"} primaryText="Life" />
      </Menu>
    );
  }

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
    const { todo, selectTodo } = this.props;

    return (
      <tr
        className={`todos-list__tr ${todo.get('selected') ? 'todos-list__tr--selected' : ''}`}
        onClick={() => selectTodo(todo.get('id'))}
      >
        <td className="todos-list__td">
          {this.renderPopOver()}
          {this.renderCheckBox(todo)}
        </td>
        <td className="todos-list__td">
          <span onClick={(e) => this.handlePopOverOpen(e, 'title', 'text')}>
            {todo.get('title')}
          </span>
        </td>
        <td className="todos-list__td">
          <span onClick={(e) => this.handlePopOverOpen(e, 'category', 'menu')}>
            <span className="todos-list__td-text">{todo.get('category') || 'null'}</span>
            <i className="material-icons">arrow_drop_down</i>
          </span>
        </td>
        <td className="todos-list__td">
          <span onClick={(e) => this.handlePopOverOpen(e, 'status', 'text')}>
            {todo.get('status') || 'null'}
          </span>
        </td>
        <td className="todos-list__td">
          <span onClick={(e) => this.handlePopOverOpen(e, 'hours', 'number')}>
            {todo.get('hours') || 'null'}
          </span>
        </td>
        <td className="todos-list__td">
          <span onClick={(e) => this.handlePopOverOpen(e, 'percentComplete', 'number')}>
            {todo.get('percentComplete') ? `${todo.get('percentComplete')}%` : 'null'}
          </span>
        </td>
        <td className="todos-list__td">
          <span onClick={(e) => this.handlePopOverOpen(e, 'note', 'text')}>
            {todo.get('note') || 'null'}
          </span>
        </td>
      </tr>
    );
  }
}

Row.propTypes = {
  todo: PropTypes.instanceOf(Immutable.Map),
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  selectTodo: PropTypes.func.isRequired,
};

export default connect(undefined, {
  toggleTodo: todosActions.toggleTodo,
  updateTodo: todosActions.updateTodo,
  selectTodo: todosActions.selectTodo,
})(Row);

