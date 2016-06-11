import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import TodoRow from './TodoRow';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { todos, updateTodo, toggleTodo } = this.props;

    return (
      <div className="tbody-ctr">
        <table>
          <tbody>
            {todos.map((todo, i) =>
              <TodoRow
                key={i}
                todo={todo}
                updateTodo={updateTodo}
                toggleTodo={toggleTodo}
              />
             )}
          </tbody>
        </table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoList;
