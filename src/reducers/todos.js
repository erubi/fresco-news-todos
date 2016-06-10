import { todosActions } from '../actions';
import { fromJS, List } from 'immutable';

// Updates the pagination data for different actions.
const todo = (state, action) => {
  switch (action.type) {
    case todosActions.ADD_TODO:
      return fromJS({ id: action.id, ...action.data, completed: false });
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
    default:
      return state;
  }
};

export default todos;

