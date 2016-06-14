import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { appActions, todosActions } from '../actions';
import Header from '../components/Header';
import TableHeader from '../components/TableHeader';
import TableFooter from '../components/TableFooter';

class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    if (window.matchMedia) {
      const mq = window.matchMedia('(max-width: 500px)');
      mq.addListener(() => this.onWidthChange(mq));
      this.onWidthChange(mq);
    }
  }

  onWidthChange(mq) {
    const { setMobile } = this.props;
    if (mq.matches) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  handleAddTodo = (title) => {
    this.props.addTodo({ title });
  }

  handleRemoveTodos = (ids) => {
    if (!ids) return null;
    this.props.removeTodos(ids);
  }

  render() {
    const {
      todos,
      toggleAllTodos,
      setRows,
      rows,
      page,
      nextPage,
      prevPage,
      totalNumTodos,
      mobile,
    } = this.props;

    if (mobile) {
      return (
        <div>
          <Header
            handleRemoveTodos={(ids) => this.handleRemoveTodos(ids)}
            handleAddTodo={this.handleAddTodo}
            selectedTodos={this.state.selectedTodos}
            title={'Title'}
          />
          <div className="todos-table-ctr">
            <TableHeader
              handleToggleAllTodos={toggleAllTodos}
              todos={todos}
              scrollShadowVisible={this.state.scrollShadowVisible}
              title={'Title'}
            />
            <TableBody
              todos={todos}
              selectedTodos={this.state.selectedTodos}
              renderTodo={this.renderTodo}
              showScrollShadow={(visible) => this.showScrollShadow(visible)}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header
          handleRemoveTodos={(ids) => this.handleRemoveTodos(ids)}
          handleAddTodo={this.handleAddTodo}
          selectedTodos={this.state.selectedTodos}
          title={'Title'}
        />
        <div className="todos-table-ctr">
          <TableHeader
            handleToggleAllTodos={toggleAllTodos}
            todos={todos}
            scrollShadowVisible={this.state.scrollShadowVisible}
            title={'Title'}
          />
          <TableBody
            todos={todos}
            selectedTodos={this.state.selectedTodos}
            renderTodo={this.renderTodo}
            showScrollShadow={(visible) => this.showScrollShadow(visible)}
          />
          <TableFooter
            prevPage={prevPage}
            nextPage={nextPage}
            visibleNumTodos={todos.size}
            totalNumTodos={totalNumTodos}
            setRows={setRows}
            rows={rows}
            page={page}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state),
    totalNumTodos: state.get('todos').size,
    rows: state.getIn(['app', 'rows']),
    page: state.getIn(['app', 'page']),
    mobile: state.getIn(['app', 'mobile']),
  };
}

TodoListContainer.propTypes = {
  rows: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  mobile: PropTypes.bool.isRequired,
  totalNumTodos: PropTypes.number.isRequired,
  todos: PropTypes.instanceOf(Immutable.List),
  toggleTodo: PropTypes.func.isRequired,
  removeTodos: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  toggleAllTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setMobile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addTodo: todosActions.addTodo,
  removeTodo: todosActions.removeTodo,
  removeTodos: todosActions.removeTodos,
  updateTodo: todosActions.updateTodo,
  toggleTodo: todosActions.toggleTodo,
  toggleAllTodos: todosActions.toggleAllTodos,
  setRows: appActions.setRows,
  prevPage: appActions.prevPage,
  nextPage: appActions.nextPage,
  setMobile: appActions.setMobile,
})(TodoListContainer);

