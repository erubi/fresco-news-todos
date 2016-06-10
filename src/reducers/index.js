import { combineReducers } from 'redux-immutable';
import app from './app';
import todos, * as fromTodos from './todos';

const rootReducer = combineReducers({
  app,
  todos,
});

export default rootReducer;

export const getVisibleTodos = (state) => (
  fromTodos.getVisibleTodos(state.get('todos'), state.get('app'))
);

