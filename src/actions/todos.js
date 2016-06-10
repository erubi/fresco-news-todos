import { v4 } from 'node-uuid';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export const addTodo = (data) => ({
  type: ADD_TODO,
  id: v4(),
  data,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id,
});
