import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class TableHeaderNav extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      todos,
      handleToggleAllTodos,
      scrollShadowVisible,
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
          <tr className={`shadow-tr ${scrollShadowVisible ? '' : 'no-display'}`} />
        </thead>
      </table>
    );
  }
}

TableHeaderNav.propTypes = {
  scrollShadowVisible: PropTypes.bool.isRequired,
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  handleToggleAllTodos: PropTypes.func.isRequired,
};

export default TableHeaderNav;
