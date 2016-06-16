import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { todosActions } from '../actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class Header extends Component {
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

  render() {
    const {
      todos,
      handleToggleAllTodos,
    } = this.props;

    return (
      <table className="todos-list__header">
        <thead>
          <tr className="todos-list__header-tr">
            <th className="todos-list__header-th">
              <i onClick={handleToggleAllTodos} className="material-icons">
                {todos.every(t => t.get('completed')) ? 'check_box' : 'check_box_outline_blank'}
              </i>
            </th>
            <th className="todos-list__header-th">Title</th>
            <th className="todos-list__header-th">Category</th>
            <th className="todos-list__header-th">Status</th>
            <th className="todos-list__header-th">Hours (n)</th>
            <th className="todos-list__header-th">Completed (%)</th>
            <th className="todos-list__header-th">Note</th>
          </tr>
          <tr
            className={`
              todos-list__shadow-tr ${this.state.scrollShadowVisible ? '' : 'no-display'}
              `}
          />
        </thead>
      </table>
    );
  }
}

Header.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  handleToggleAllTodos: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state),
  };
}

export default connect(mapStateToProps, {
  handleToggleAllTodos: todosActions.toggleAllTodos,
})(Header);

