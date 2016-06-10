import { combineReducers } from 'redux-immutable';
import { todosActions } from '../actions';
import { Map } from 'immutable';

// Updates the pagination data for different actions.
const todos = combineReducers({
  byPage: (state = Map(), action) => {
    switch (action.type) {
      case todosActions.NEXT_PAGE:
      case todosActions.PREV_PAGE:
      case todosActions.ROWS_PER_PAGE:
      case todosActions.TODOS_ADD:
      case todosActions.TODOS_REMOVE:
      default:
        return state;
    }
  },
  byId: (state = Map(), action) => {
    switch (action.type) {
      case todosActions.TODOS_ADD:
      case todosActions.TODOS_REMOVE:
      default:
        return state;
    }
  },
});

export default todos;

