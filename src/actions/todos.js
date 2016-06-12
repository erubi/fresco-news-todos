import { v4 } from 'node-uuid';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const REMOVE_TODOS = 'REMOVE_TODOS';

export const addTodo = (data) => ({
  type: ADD_TODO,
  id: v4(),
  data,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id,
});

export const removeTodos = (ids) => ({
  type: REMOVE_TODOS,
  ids,
});

export const updateTodo = (id, data) => ({
  type: UPDATE_TODO,
  id,
  data,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

export const toggleAllTodos = () => (dispatch, getState) => {
  if (getState().get('todos').every(t => t.get('completed'))) {
    return dispatch({
      type: TOGGLE_ALL_TODOS,
      completed: false,
    });
  }

  return dispatch({
    type: TOGGLE_ALL_TODOS,
    completed: true,
  });
};
