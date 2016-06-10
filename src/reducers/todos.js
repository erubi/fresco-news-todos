import { combineReducers } from 'redux-immutable';
import { todosActions } from '../actions';
import { Map } from 'immutable';
import paginate from './paginate';

// Updates the pagination data for different actions.
const todos = combineReducers({
  byFilter: paginate({
    mapActionToKey: action => action.filter,
    types: [
      todosActions.TODOS_REQUEST,
      todosActions.TODOS_SUCCESS,
      todosActions.TODOS_FAILURE,
      todosActions.TODOS_REMOVE,
    ],
  }),
  byId: (state = Map(), action) => {
    if (action.response && action.response.entities && action.response.entities.games) {
      return state.mergeDeep(action.response.entities.games);
    }

    return state;
  },
});

export default todos;

