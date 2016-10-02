import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { loadState, saveState } from '../localStorage';

export default function configureStore() {
  const persistedState = fromJS(loadState());
  const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().get('todos'),
    });
  }, 1000));

  return store;
}

