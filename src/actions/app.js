export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';
export const SET_ROWS = 'SET_ROWS';

export const nextPage = () => ({
  type: NEXT_PAGE,
});

export const prevPage = () => ({
  type: PREV_PAGE,
});

export const setRows = (num) => ({
  type: SET_ROWS,
  num,
});
