import { todosActions } from '../actions';
import { fromJS, List } from 'immutable';

// Updates the pagination data for different actions.
const todo = (state, action) => {
  switch (action.type) {
    case todosActions.ADD_TODO:
      return fromJS({ id: action.id, ...action.data, completed: false });
    case todosActions.TOGGLE_TODO:
      if (state.get('id') !== action.id) {
        return state;
      }
      return state.update('completed', v => !v);
    case todosActions.TOGGLE_ALL_TODOS:
      return state.set('completed', action.completed);
    case todosActions.UPDATE_TODO:
      if (state.get('id') !== action.id) {
        return state;
      }
      return state.merge(action.data);
    default:
      return state;
  }
};


const todos = (state = List(), action) => {
  switch (action.type) {
    case todosActions.ADD_TODO:
      return state.push(todo(undefined, action));
    case todosActions.REMOVE_TODO:
      return state.filterNot(t => t.get('id') === action.id);
    case todosActions.TOGGLE_TODO:
      return state.map(t => todo(t, action));
    case todosActions.TOGGLE_ALL_TODOS:
      return state.map(t => todo(t, action));
    case todosActions.UPDATE_TODO:
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;

export const getVisibleTodos = (todosState, appState) => {
  const rows = appState.get('rows');
  const page = appState.get('page');
  const i = rows * page;
  const j = i + rows;

  return todosState.slice(i, j);
};

