import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import ListBody from '../components/ListBody';
import ListRow from '../containers/ListRow';

class ListBody extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderTodo(key, todo) {
    return (
      <ListRow key={key} todo={todo} />
    );
  }

  render() {
    const { todos } = this.props;

    return (
      <div id="tbody-ctr" className="tbody-ctr">
        <table>
          <tbody>
            {todos.map((todo, i) => this.renderTodo(i, todo, this.isSelected(todo.get('id'))))}
          </tbody>
        </table>
      </div>
    );
  }
}

ListBodyContainer.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  selectedTodos: PropTypes.array.isRequired,
  renderTodo: PropTypes.func.isRequired,
  showScrollShadow: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state),
  };
}

export default connect(mapStateToProps)(ListBodyContainer);
