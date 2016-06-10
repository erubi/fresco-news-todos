import { fromJS } from 'immutable';
import { expect } from 'chai';
// import actions from '../../src/actions';
import reducer from '../../src/reducers/todos';

describe('todo reducer', () => {
  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.equal(fromJS({
      byFilter: {},
      byId: {},
    }));
  });
});
