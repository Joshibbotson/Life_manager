import { createReducer, on } from '@ngrx/store'
import {
  IReadTodo,
  ITodo,
  ITodoReadRequest,
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
} from './todos.actions'

export interface TodosState {
  todos: ITodoReadRequest
  error: string | null
  status: string
}

const initialState: TodosState = {
  todos: { skip: 0, take: 10, count: 0, data: [] },
  error: null,
  status: 'pending',
}

export interface TodoState {
  selectedTodo: IReadTodo | null
  error: string | null
  status: string
}

const initialTodoState: TodoState = {
  selectedTodo: null,
  error: null,
  status: 'pending',
}

export const todosReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({
    todos: todos,
    error: null,
    status: 'success',
  })),
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(createTodoSuccess, (state, { todo }) => {
    console.log(todo)
    return {
      ...state,
      todos: {
        ...state.todos,
        data: [...state.todos.data, todo],
      },
    }
  }),

  on(deleteTodoSuccess, (state, { todo }) => {
    const todoIndex = state.todos.data.findIndex(
      (oldTodo) => oldTodo.id === todo.id,
    )

    if (todoIndex !== -1) {
      const stateCopy = [...state.todos.data]
      return {
        ...state,
        todos: {
          ...state.todos,
          data: stateCopy.filter((oldTodo) => oldTodo.id !== todo.id),
        },
      }
    }
    return state
  }),

  on(completeTodoSuccess, (state, { todo }) => {
    const updatedTodos = state.todos.data.map((oldTodo) => {
      if (oldTodo.id === todo.id) {
        return { ...oldTodo, completed: todo.completed }
      }
      return oldTodo
    })

    return {
      ...state,
      todos: {
        ...state.todos,
        data: updatedTodos,
      },
    }
  }),

  on(reloadTodos, (state) => {
    return { ...state }
  }),
)

export const todoReducer = createReducer(
  initialTodoState,
  on(loadTodoByIdSuccess, (state, { todo }) => ({
    selectedTodo: todo,
    error: null,
    status: 'success',
  })),
  on(loadTodoByIdFailure, (state, { error }) => ({
    selectedTodo: null,
    error,
    status: 'error',
  })),
)
