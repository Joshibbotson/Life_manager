import { ActionReducerMap } from '@ngrx/store'
import * as todos from './todos/todos.reducer'
import * as auth from './auth/auth.reducer'

export interface State {
  todos: todos.TodosState
  selectedTodo: todos.TodoState
  auth: auth.AuthState
}

export const reducers: ActionReducerMap<State> = {
  todos: todos.todosReducer,
  selectedTodo: todos.todoReducer,
  auth: auth.authReducer,
}
