import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class ListBody extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

ListBody.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  selectedTodos: PropTypes.array.isRequired,
  renderTodo: PropTypes.func.isRequired,
  showScrollShadow: PropTypes.func.isRequired,
};

export default ListBody;
