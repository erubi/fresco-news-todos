import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { todosActions } from '../actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class ListHeader extends Component {
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
      <table>
        <thead className="table-header-ctr">
          <tr className="header-cells">
            <th>
              <i onClick={handleToggleAllTodos} className="material-icons">
                {todos.every(t => t.get('completed')) ? 'check_box' : 'check_box_outline_blank'}
              </i>
            </th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Hours (n)</th>
            <th>Completed (%)</th>
            <th>Note</th>
          </tr>
          <tr className={`shadow-tr ${this.state.scrollShadowVisible ? '' : 'no-display'}`} />
        </thead>
      </table>
    );
  }
}

ListHeader.propTypes = {
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
})(ListHeader);

