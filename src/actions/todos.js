import { v4 } from 'node-uuid';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';

export const addTodo = (data) => ({
  type: ADD_TODO,
  id: v4(),
  data,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id,
});

export const updateTodo = (id, data) => ({
  type: TOGGLE_TODO,
  id,
  data,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

export const toggleAllTodos = () => ({
  type: TOGGLE_ALL_TODOS,
});
