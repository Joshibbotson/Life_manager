import { createAction, props } from '@ngrx/store'
import {
  IFilter,
  IReadTodo,
  ISort,
  ITodo,
} from '../../../../../api/dist/todos/index'
import { TodoStatus } from './todos.reducer'

export interface ILoadTodosProps {
  skip: number
  take: number
  filter?: Partial<IFilter>
  sort?: Partial<ISort>
  term?: string
}

export const loadTodos = createAction(
  '[Todos] Load Todos',
  props<ILoadTodosProps>(),
) // represents the call

export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{
    todos: IReadTodo[]
    error?: string
    status: TodoStatus
    count: number
    skip: number
    take: number
  }>(),
) // represents the actual data emitted by the observable hence it's not an observable type but it's actual data.

export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: string; status: TodoStatus }>(),
)

export const loadTodoById = createAction(
  '[Todos] Load Todo By ID',
  props<{ id: number }>(),
)

export const loadTodoByIdSuccess = createAction(
  '[Todos] Load Todo By ID Success',
  props<{
    todo: IReadTodo
    error?: string
    status: TodoStatus
  }>(), // put this into an interface
)

export const loadTodoByIdFailure = createAction(
  '[Todos] Load Todo By ID Failure',
  props<{ error: string; status: TodoStatus }>(),
)

export const createTodo = createAction(
  '[Todos] Create Todo',
  props<{ todo: ITodo }>(),
)
export const createTodoSuccess = createAction(
  '[Todos] Create Todo Success',
  props<{ todo: IReadTodo }>(),
)

export const completeTodo = createAction(
  '[Todos] complete Todo',
  props<{ id: number; version: number }>(),
)
export const completeTodoSuccess = createAction(
  '[Todos] complete Todo Success',
  props<{ todo: IReadTodo }>(),
)

export const deleteTodo = createAction(
  '[Todos] delete Todo',
  props<{ id: number }>(),
)
export const deleteTodoSuccess = createAction(
  '[Todos] delete Todo Success',
  props<{ todo: IReadTodo }>(),
)
export const reloadTodos = createAction('[Todos] Reload Todos')

//update naming.
export const setSkipAndTake = createAction(
  '[Todos] Set Skip and Take',
  props<ILoadTodosProps>(),
)
export const setSkipAndTakeSuccess = createAction(
  '[Todos] Set Skip and Take Success',
  props<ILoadTodosProps>(),
)

export const resetTodosState = createAction('[Todos] reset todos state')
