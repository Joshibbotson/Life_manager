import { createAction, props } from '@ngrx/store'
import { IChore, IChoreReadRequest } from '../../../../../api/dist/chores/index'

export interface SetSkipAndTakeAction {
  skip: number
  take: number
}

export const loadChores = createAction(
  '[Chores] Load Chores',
  props<SetSkipAndTakeAction>(),
) // represents the call

export const loadChoresSuccess = createAction(
  '[Chores] Load Chores Success',
  props<{ chores: IChoreReadRequest }>(),
) // represents the actual data emitted by the observable hence it's not an observable type but it's actual data.

export const loadChoresFailure = createAction(
  '[Chores] Load Chores Failure',
  props<{ error: string }>(),
)

export const loadChoreById = createAction(
  '[Chores] Load Chore By ID',
  props<{ id: number }>(),
)

export const loadChoreByIdSuccess = createAction(
  '[Chores] Load Chore By ID Success',
  props<{ chore: IChore }>(),
)

export const loadChoreByIdFailure = createAction(
  '[Chores] Load Chore By ID Failure',
  props<{ error: string }>(),
)

export const createChore = createAction(
  '[Chores] Create Chore',
  props<{ chore: IChore }>(),
)
export const createChoreSuccess = createAction(
  '[Chores] Create Chore Success',
  props<{ chore: IChore }>(),
)

export const completeChore = createAction(
  '[Chores] complete Chore',
  props<{ id: number }>(),
)
export const completeChoreSuccess = createAction(
  '[Chores] complete Chore Success',
  props<{ chore: IChore }>(),
)

export const deleteChore = createAction(
  '[Chores] delete Chore',
  props<{ id: number }>(),
)
export const deleteChoreSuccess = createAction(
  '[Chores] delete Chore Success',
  props<{ chore: IChore }>(),
)
export const reloadChores = createAction('[Chores] Reload Chores')

export const setSkipAndTake = createAction(
  '[Chores] Set Skip and Take',
  props<SetSkipAndTakeAction>(),
)
export const setSkipAndTakeSuccess = createAction(
  '[Chores] Set Skip and Take Success',
  props<SetSkipAndTakeAction>(),
)
