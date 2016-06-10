import { createStore } from 'redux';
import rootReducer from '../reducers';
import { loadState, saveState } from '../localStorage';
import throttle from 'lodash/throttle';
// import thunk from 'redux-thunk';

export default function configureStore() {
  const persistedState = loadState();
  const store = createStore(rootReducer, persistedState);
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().get('todos'),
    });
  }, 1000));

  return store;
}

