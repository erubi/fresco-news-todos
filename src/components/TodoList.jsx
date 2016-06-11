import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import TableHeaderNav from './TableHeaderNav';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';

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

  renderTodo(todo, i) {
    return (
      <TableRow className="todo-row" key={i} selected={todo.get('completed')}>
        <TableRowColumn>{todo.get('title')}</TableRowColumn>
        <TableRowColumn>{todo.get('category')}</TableRowColumn>
        <TableRowColumn>{todo.get('assignee')}</TableRowColumn>
        <TableRowColumn>{todo.get('hours')}</TableRowColumn>
        <TableRowColumn>
          {todo.get('percentComplete') ? `${todo.get('percentComplete')}%` : ''}
        </TableRowColumn>
        <TableRowColumn>{todo.get('note')}</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { rows, todos } = this.props;

    return (
      <Table className="todos-table">
        <TableHeader className="table-header">
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

        <TableBody className="table-body">
          {todos.map((todo, i) => this.renderTodo(todo, i))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <td />
            <td />
            <TableRowColumn>
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
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

TodoList.propTypes = {
  rows: PropTypes.number,
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  addTodo: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  addTodoDialogOpen: PropTypes.bool,
  openAddTodoDialog: PropTypes.func,
  closeAddTodoDialog: PropTypes.func,
};

export default TodoList;
