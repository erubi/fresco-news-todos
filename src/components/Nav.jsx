import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getSelectedTodos } from '../reducers';
import { todosActions } from '../actions';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      newTodoDialogOpen: false,
    };
  }

  openNewTodoDialog = () => {
    this.setState({ newTodoDialogOpen: true });
  }

  handleAddTodo = (e) => {
    if (e) e.preventDefault();
    const title = this.refs.newTodoTitle.value;

    if (title && title.length) {
      this.setState({ newTodoDialogOpen: false }, () => this.props.addTodo({ title }));
    }
  }

  renderAddTodoDialog() {
    const actions = [
      <FlatButton
        key={'cancel'}
        label="Cancel"
        style={{ color: '#0047bb' }}
        onTouchTap={() => this.setState({ newTodoDialogOpen: false })}
      />,
      <FlatButton
        key={'save'}
        label="Save"
        style={{ color: '#0047bb' }}
        onTouchTap={this.handleAddTodo}
      />,
    ];

    return (
      <Dialog
        title="Title"
        contentClassName={'dialog'}
        actions={actions}
        modal
        open={this.state.newTodoDialogOpen}
      >
        <div>
          <form onSubmit={(e) => this.handleAddTodo(e)}>
            <input
              className="dialog__input"
              maxLength="10"
              ref="newTodoTitle"
              type="text"
              autoFocus
            />
          </form>
        </div>
      </Dialog>
    );
  }

  render = () => {
    const { title, selectedTodos, removeTodos } = this.props;
    const numSelected = selectedTodos ? selectedTodos.size : 0;

    if (numSelected) {
      return (
        <div className="nav nav--selected">
          <span>
            {`${numSelected} item${numSelected > 1 ? "'s" : ''} selected`}
          </span>
          <FontIcon className="material-icons nav__icon">more_vert</FontIcon>
          <FontIcon
            className="material-icons nav__icon"
            onClick={() => removeTodos(selectedTodos.map(t => t.get('id')))}
          >
            delete
          </FontIcon>
        </div>
      );
    }

    return (
      <div className="nav">
        {this.renderAddTodoDialog()}
        <span className="nav__title">{title}</span>
        <FontIcon className="material-icons nav__icon">more_vert</FontIcon>
        <FontIcon className="material-icons nav__icon" onClick={this.openNewTodoDialog}>add</FontIcon>
      </div>
    );
  }
}

Nav.propTypes = {
  title: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodos: PropTypes.func.isRequired,
  selectedTodos: PropTypes.instanceOf(List),
};

function mapStateToProps(state) {
  return {
    selectedTodos: getSelectedTodos(state),
  };
}

export default connect(mapStateToProps, {
  addTodo: todosActions.addTodo,
  removeTodos: todosActions.removeTodos,
})(Nav);
