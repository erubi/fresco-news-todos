import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
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

  renderTodo(todo) {
    return (
      <TableRow selected={todo.get('completed')}>
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
      <Table>
        <TableHeader>
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
          {todos.map(todo => this.renderTodo(todo))}
        </TableBody>
      </Table>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List),
};

export default TodoList;
