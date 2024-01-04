import { createReducer, on } from '@ngrx/store'
import {
  IReadTodo,
  ITodo,
  ITodoReadRequest,
  ITodoReadResponse,
} from '../../../../../api/dist/todos/index'
import {
  loadTodosSuccess,
  createTodoSuccess,
  deleteTodoSuccess,
  loadTodosFailure,
  loadTodoByIdSuccess,
  loadTodoByIdFailure,
  reloadTodos,
  completeTodoSuccess,
  resetTodosState,
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
    console.log('createTodoSuccess', todo)
    return {
      ...state,
      todos: [...state.todos, todo],
    }
  }),

  on(deleteTodoSuccess, (state, { todo }) => {
    const todoIndex = state.todos.findIndex((oldTodo) => oldTodo.id === todo.id)

    if (todoIndex !== -1) {
      return {
        ...state,
        todos: [...state.todos.filter((oldTodo) => oldTodo.id !== todo.id)],
      }
    }
    return state
  }),

  on(completeTodoSuccess, (state, { todo }) => {
    const updatedTodos = state.todos.map((oldTodo) => {
      if (oldTodo.id === todo.id) {
        return { ...oldTodo, completed: todo.completed }
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
  on(loadTodoByIdSuccess, (state, { todo, error, status }) => ({
    selectedTodo: todo[0],
    error: error,
    status: status,
  })),

  on(loadTodoByIdFailure, (state, { error, status }) => ({
    selectedTodo: null,
    error,
    status: status,
  })),
)
