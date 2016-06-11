import { fromJS, List } from 'immutable';
import { expect } from 'chai';
import { todosActions } from '../../src/actions';
import reducer from '../../src/reducers/todos';

describe('todo reducer', () => {
  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
		).to.equal(List());
  });

  it('handles ADD_TODO', () => {
    const initialState = reducer(undefined, {});
    const todo = {
      title: 'Example text',
      category: 'Home',
      assignee: 'Me',
      hours: 2,
      percentComplete: 26,
      note: 'Example note',
    };
    const action = todosActions.addTodo(todo);
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS([{ id: action.id, ...todo, completed: false }]));
  });

  it('handles REMOVE_TODO', () => {
    const initialState = reducer(fromJS([{ id: '231', completed: false }]), {});
    const action = todosActions.removeTodo('231');
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS([]));
  });

  it('handles TOGGLE_TODO', () => {
    const initialState = reducer(fromJS([{ id: '231', completed: false }]), {});
    const action = todosActions.toggleTodo('231');
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS([{ id: '231', completed: true }]));
  });

  it('handles TOGGLE_ALL_TODOS', () => {
    const initialState = reducer(fromJS(
      [
        { id: '231', completed: false },
        { id: '232', completed: false },
        { id: '233', completed: true },
      ]), {});
    const action = { type: todosActions.TOGGLE_ALL_TODOS, completed: true };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      [
        { id: '231', completed: true },
        { id: '232', completed: true },
        { id: '233', completed: true },
      ]));
  });

  it('handles UPDATE_TODO', () => {
    const initialState = reducer(fromJS([{ id: '231', completed: false }]), {});
    const action = todosActions.updateTodo('231', { title: 'blah', assignee: 'dude' });
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      [{ id: '231', completed: false, title: 'blah', assignee: 'dude' }]
    ));
  });
});
