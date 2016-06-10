import { appActions } from '../actions';
import { fromJS } from 'immutable';

const app = (state = fromJS({ page: 0, rows: 10 }), action) => {
  switch (action.type) {
    case appActions.NEXT_PAGE:
      return state.update('page', v => v + 1);
    case appActions.PREV_PAGE:
      return state.update('page', v => (v ? v - 1 : 0));
    case appActions.SET_ROWS:
      return state.set('rows', action.num);
    default:
      return state;
  }
};

export default app;
