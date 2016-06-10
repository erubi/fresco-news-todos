import { fromJS } from 'immutable';
import { expect } from 'chai';
import reducer, { getVisibleTodos } from '../../src/reducers';

describe('reducers', () => {
  it('getVisibleTodos returns the visible todos', () => {
    const initialState = reducer(fromJS({
      todos: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
      ],
      app: { rows: 3, page: 0 },
    }), {});

    expect(getVisibleTodos(initialState)).to.equal(fromJS(
      [{ id: '1' }, { id: '2' }, { id: '3' }]
    ));
  });
});
