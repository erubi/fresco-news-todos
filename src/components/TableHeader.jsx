import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class TableHeaderNav extends Component {
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

  handleAddTodo = () => {
    const title = this.refs.newTodoTitle.value;
    if (title && title.length) {
      this.setState({ newTodoDialogOpen: false }, this.props.handleAddTodo(title));
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
        contentClassName={'new-todo-dialog'}
        titleClassName={'new-todo-dialog-title'}
        actions={actions}
        modal
        open={this.state.newTodoDialogOpen}
      >
        <div className="input">
          <input maxLength="10" ref="newTodoTitle" type="text"></input>
        </div>
      </Dialog>
    );
  }

  renderControls = () => {
    const { title, selectedTodos } = this.props;
    const numSelected = selectedTodos.length;

    if (numSelected) {
      return (
        <tr className="controls selected-todos">
          <th colSpan={6} className="title">
            {`${numSelected} item${numSelected > 1 ? "'s" : ''} selected`}
          </th>
          <th>
            <FontIcon className="material-icons">more_vert</FontIcon>
            <FontIcon className="material-icons" onClick={this.openNewTodoDialog}>add</FontIcon>
          </th>
        </tr>
      );
    }

    return (
      <tr className="controls">
        <th colSpan={6} className="title">{title}</th>
        <th>
          <FontIcon className="material-icons">more_vert</FontIcon>
          <FontIcon className="material-icons" onClick={this.openNewTodoDialog}>add</FontIcon>
        </th>
      </tr>
    );
  }

  render() {
    const { todos, handleToggleAllTodos } = this.props;

    return (
      <table>
        <thead className="table-header-ctr">
          {this.renderControls()}
          <tr className="header-cells">
            <th>
              <i onClick={handleToggleAllTodos} className="material-icons">
                {todos.every(t => t.get('completed')) ? 'check_box' : 'check_box_outline_blank'}
              </i>
            </th>
            <th className="title-cell">Title</th>
            <th className="category-cell">Category</th>
            <th className="status-cell">Status</th>
            <th className="hours-cell">Hours (n)</th>
            <th className="completed-cell">Completed (%)</th>
            <th className="note-cell">Note</th>
          </tr>
          {this.renderAddTodoDialog()}
        </thead>
      </table>
    );
  }
}

TableHeaderNav.propTypes = {
  title: PropTypes.string.isRequired,
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  handleToggleAllTodos: PropTypes.func.isRequired,
  selectedTodos: PropTypes.array.isRequired,
};

export default TableHeaderNav;
