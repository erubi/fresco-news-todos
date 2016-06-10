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
      text: 'Example text',
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
});
