import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TodoState, TodosState } from './todos.reducer'

export const selectTodosState = createFeatureSelector<TodosState>('todos')
export const selectTodoState = createFeatureSelector<TodoState>('selectedTodo')

export const selectTodos = createSelector(
  selectTodosState,
  (state: TodosState) => state,
)

export const selectedTodo = createSelector(
  selectTodoState,
  (state: TodoState) => state.selectedTodo,
)
