import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  isSelected(todoId) {
    return this.props.selectedTodos.includes(todoId);
  }

  render() {
    const { todos, renderTodo } = this.props;

    return (
      <div className="tbody-ctr">
        <table>
          <tbody>
            {todos.map((todo, i) => renderTodo(i, todo, this.isSelected(todo.get('id'))))}
          </tbody>
        </table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  selectedTodos: PropTypes.array.isRequired,
  renderTodo: PropTypes.func.isRequired,
};

export default TodoList;
