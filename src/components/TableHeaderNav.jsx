import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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

  render() {
    const { title } = this.props;

    return (
      <tr className="table-header-nav">
        <th className="title">{title}</th>
        <th />
        <th />
        <th />
        <th />
        <th />
        <th className="todo-header-btns">
          <FontIcon className="material-icons" onClick={this.openNewTodoDialog}>add</FontIcon>
          <FontIcon className="material-icons">more_vert</FontIcon>
        </th>
        {this.renderAddTodoDialog()}
      </tr>
    );
  }
}

TableHeaderNav.propTypes = {
  title: PropTypes.string.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
};

export default TableHeaderNav;
