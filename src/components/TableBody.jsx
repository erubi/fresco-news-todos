import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    document.getElementById('tbody-ctr').addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.getElementById('tbody-ctr').removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scrollTop = event.srcElement.scrollTop;
    if (scrollTop === 0) {
      this.props.showScrollShadow(false);
    } else {
      this.props.showScrollShadow(true);
    }
  }

  isSelected(todoId) {
    return this.props.selectedTodos.includes(todoId);
  }

  render() {
    const { todos, renderTodo } = this.props;

    return (
      <div id="tbody-ctr" className="tbody-ctr">
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
  showScrollShadow: PropTypes.func.isRequired,
};

export default TodoList;
