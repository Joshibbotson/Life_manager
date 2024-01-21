import { createReducer, on } from '@ngrx/store'
import { IReadTodo } from '../../../../../api/dist/todos/index'
import {
  loadTodosSuccess,
  createTodoSuccess,
  deleteTodoSuccess,
  loadTodosFailure,
  loadTodoByIdSuccess,
  loadTodoByIdFailure,
  reloadTodos,
  completeTodoSuccess,
  updateTodo,
  updateTodoSuccess,
} from './todos.actions'

export type TodoStatus = 'pending' | 'loading' | 'success' | 'failure'

export interface TodosState {
  todos: IReadTodo[] | []
  error?: string
  status: TodoStatus
  count: number
  skip: number
  take: number
}

const initialState: TodosState = {
  todos: [],
  error: undefined,
  status: 'pending',
  count: 0,
  skip: 0,
  take: 10,
}

export interface TodoState {
  selectedTodo: IReadTodo | null
  error?: string
  status: TodoStatus
}

const initialTodoState: TodoState = {
  selectedTodo: null,
  error: undefined,
  status: 'pending',
}

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos, count, skip, take, error, status }) => ({
      todos: todos,
      error: error,
      status: status,
      count: count,
      skip: skip,
      take: take,
    }),
  ),
  on(loadTodosFailure, (state, { error, status }) => ({
    ...state,
    error: error,
    status: status,
  })),

  on(createTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      count: state.count + 1,
      todos: [...state.todos, todo],
    }
  }),

  on(deleteTodoSuccess, (state, { todo }) => {
    const todoIndex = state.todos.findIndex((oldTodo) => oldTodo.id === todo.id)

    if (todoIndex !== -1) {
      return {
        ...state,
        count: state.count - 1,
        todos: [...state.todos.filter((oldTodo) => oldTodo.id !== todo.id)],
      }
    }
    return state
  }),

  on(updateTodoSuccess, (state, { todo }) => {
    const updatedTodos = state.todos.map((oldTodo) => {
      if (oldTodo.id === todo.id) {
        return { ...todo }
      }
      return oldTodo
    })

    return {
      ...state,
      todos: updatedTodos,
    }
  }),

  on(completeTodoSuccess, (state, { todo }) => {
    const updatedTodos = state.todos.map((oldTodo) => {
      if (oldTodo.id === todo.id) {
        return { ...oldTodo, completed: todo.completed, version: todo.version }
      }
      return oldTodo
    })

    return {
      ...state,
      todos: updatedTodos,
    }
  }),

  on(reloadTodos, (state) => {
    return { ...state }
  }),
)

export const todoReducer = createReducer(
  initialTodoState,
  on(loadTodoByIdSuccess, (_, { todo, error, status }) => ({
    selectedTodo: todo,
    error: error,
    status: status,
  })),

  on(loadTodoByIdFailure, (_, { error, status }) => ({
    selectedTodo: null,
    error,
    status: status,
  })),

  on(updateTodoSuccess, (state, { todo }) => {
    if (state.selectedTodo && state.selectedTodo.id === todo.id) {
      return {
        ...state,
        selectedTodo: todo,
      }
    }

    return state
  }),

  on(completeTodoSuccess, (state, { todo }) => {
    if (state.selectedTodo && state.selectedTodo.id === todo.id) {
      const updatedTodo = {
        ...state.selectedTodo,
        completed: todo.completed,
        version: todo.version,
      }

      return {
        ...state,
        selectedTodo: updatedTodo,
      }
    }

    return state
  }),

  on(deleteTodoSuccess, (state) => ({
    ...state,
    selectedTodo: null,
  })),
)
