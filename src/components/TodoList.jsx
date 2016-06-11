import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import TableHeaderNav from './TableHeaderNav';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleAddTodo = (title) => {
    this.props.addTodo({ title });
  }

  renderTodo(todo, i) {
    return (
      <TableRow key={i} selected={todo.get('completed')}>
        <TableRowColumn>{todo.get('title')}</TableRowColumn>
        <TableRowColumn>{todo.get('category')}</TableRowColumn>
        <TableRowColumn>{todo.get('assignee')}</TableRowColumn>
        <TableRowColumn>{todo.get('hours')}</TableRowColumn>
        <TableRowColumn>{todo.get('percentComplete')}%</TableRowColumn>
        <TableRowColumn>{todo.get('note')}%</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { todos } = this.props;

    return (
      <div>
        <Table>
          <TableHeader>
            <TableHeaderNav handleAddTodo={this.handleAddTodo} title={'Title'} />
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Hours (n)</TableHeaderColumn>
              <TableHeaderColumn>Completed (%)</TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody>
            {todos.map((todo, i) => this.renderTodo(todo, i))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  addTodo: PropTypes.func.isRequired,
  addTodoDialogOpen: PropTypes.bool,
  openAddTodoDialog: PropTypes.func,
  closeAddTodoDialog: PropTypes.func,
};

export default TodoList;
