import { createAction, props } from '@ngrx/store'
import { ITodo, ITodoReadRequest } from '../../../../../api/dist/todos/index'

export interface SetSkipAndTakeAction {
  skip: number
  take: number
}

export const loadTodos = createAction(
  '[Todos] Load Todos',
  props<SetSkipAndTakeAction>(),
) // represents the call

export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{ todos: ITodoReadRequest }>(),
) // represents the actual data emitted by the observable hence it's not an observable type but it's actual data.

export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: string }>(),
)

export const loadTodoById = createAction(
  '[Todos] Load Todo By ID',
  props<{ id: number }>(),
)

export const loadTodoByIdSuccess = createAction(
  '[Todos] Load Todo By ID Success',
  props<{ todo: ITodo }>(),
)

export const loadTodoByIdFailure = createAction(
  '[Todos] Load Todo By ID Failure',
  props<{ error: string }>(),
)

export const createTodo = createAction(
  '[Todos] Create Todo',
  props<{ todo: ITodo }>(),
)
export const createTodoSuccess = createAction(
  '[Todos] Create Todo Success',
  props<{ todo: ITodo }>(),
)

export const completeTodo = createAction(
  '[Todos] complete Todo',
  props<{ id: number }>(),
)
export const completeTodoSuccess = createAction(
  '[Todos] complete Todo Success',
  props<{ todo: ITodo }>(),
)

export const deleteTodo = createAction(
  '[Todos] delete Todo',
  props<{ id: number }>(),
)
export const deleteTodoSuccess = createAction(
  '[Todos] delete Todo Success',
  props<{ todo: ITodo }>(),
)
export const reloadTodos = createAction('[Todos] Reload Todos')

export const setSkipAndTake = createAction(
  '[Todos] Set Skip and Take',
  props<SetSkipAndTakeAction>(),
)
export const setSkipAndTakeSuccess = createAction(
  '[Todos] Set Skip and Take Success',
  props<SetSkipAndTakeAction>(),
)
