import { createAction, props } from "@ngrx/store";
import {IChore} from '../../../../../api/dist/chores/index'


export const loadChores = createAction('[Chores] Load Chores')
export const loadChoresSuccess = createAction('[Chores] Load Chores Success', props<{ chores: IChore[] }>()); // represents the actual data emitted by the observable hence it's not an observable type but it's actual data.
export const createChore = createAction('[Chores] Create Chore', props<{ chore: IChore }>());
export const createChoreSuccess = createAction('[Chores] Create Chore Success', props<{ chore: IChore }>());
export const deleteChore = createAction('[Chores] delete Chore', props<{id: number}>())
export const deleteChoreSuccess = createAction('[Chores] delete Chore Success', props<{id: number}>())