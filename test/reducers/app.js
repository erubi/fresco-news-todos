import { fromJS } from 'immutable';
import { expect } from 'chai';
import { appActions } from '../../src/actions';
import reducer from '../../src/reducers/app';

describe('app reducer', () => {
  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
		).to.equal(fromJS({ page: 0, rows: 10 }));
  });

  it('handles NEXT_PAGE', () => {
    const initialState = reducer(undefined, {});
    const action = { type: appActions.NEXT_PAGE };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({ page: 1, rows: 10 }));
  });

  it('handles PREV_PAGE', () => {
    const initialState = reducer(fromJS({ page: 1, rows: 10 }), {});
    const action = appActions.prevPage();
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({ page: 0, rows: 10 }));
  });

  it('handles PREV_PAGE from page 0', () => {
    const initialState = reducer(undefined, {});
    const action = appActions.prevPage();
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({ page: 0, rows: 10 }));
  });

  it('handles SET_ROWS', () => {
    const initialState = reducer(undefined, {});
    const action = appActions.setRows(20);
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({ page: 0, rows: 20 }));
  });
});
