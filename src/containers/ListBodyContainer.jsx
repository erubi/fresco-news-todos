import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import ListBody from '../components/ListBody';
import TodoRow from '../components/TodoRow';
import filter from 'lodash/filter';

class ListBodyContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      scrollShadowVisible: false,
    };
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
      this.setState({ scrollShadowVisible: false });
    } else {
      this.setState({ scrollShadowVisible: true });
    }
  }

  isSelected(todoId) {
    return this.props.selectedTodos.includes(todoId);
  }

  renderTodo(key, todo, selected) {
    return (
      <ListRow key={key} todo={todo} />
    );
  }

  render() {
    return (
      <ListBody renderTodo={(key, todo) => this.renderTodo(key, todo)} {...this.props } />
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
