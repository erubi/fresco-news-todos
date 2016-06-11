export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';
export const SET_ROWS = 'SET_ROWS';

export const nextPage = () => (dispatch, getState) => {
  const page = getState().getIn(['app', 'page']);
  const rows = getState().getIn(['app', 'rows']);
  const totalNumTodos = getState().get('todos').size;

  if (((page * rows) + rows) > totalNumTodos) {
    return null;
  }

  return dispatch({
    type: NEXT_PAGE,
  });
};

export const prevPage = () => ({
  type: PREV_PAGE,
});

export const setRows = (num) => ({
  type: SET_ROWS,
  num,
});
