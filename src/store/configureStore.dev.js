import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { Iterable, fromJS } from 'immutable';
import { loadState, saveState } from '../localStorage';
import throttle from 'lodash/throttle';

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};

    for (const i of Object.keys(state.toJS())) {
      if (Iterable.isIterable(state.get(i))) {
        newState[i] = state.get(i).toJS();
      } else {
        newState[i] = state.get(i);
      }
    }
    return newState;
  },
});


export default function configureStore() {
  const persistedState = fromJS(loadState());
  const store = createStore(rootReducer, persistedState, applyMiddleware(logger));
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().get('todos'),
    });
  }, 1000));

  return store;
}

