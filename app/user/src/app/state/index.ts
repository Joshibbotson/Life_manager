import { ActionReducerMap } from '@ngrx/store'
import * as todos from './todos/todos.reducer'
import * as auth from './auth/auth.reducer'
import * as sidebar from './sidebar/sidebar.reducer'

export interface State {
  todos: todos.TodosState
  selectedTodo: todos.TodoState
  auth: auth.AuthState
  sidebar: boolean
}

export const reducers: ActionReducerMap<State> = {
  todos: todos.todosReducer,
  selectedTodo: todos.todoReducer,
  auth: auth.authReducer,
  sidebar: sidebar.sidebarReducer,
}
