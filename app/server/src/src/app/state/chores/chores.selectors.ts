import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ChoreState, ChoresState } from './chores.reducer'

export const selectChoresState = createFeatureSelector<ChoresState>('chores')
export const selectChoreState =
  createFeatureSelector<ChoreState>('selectedChore')

export const selectChores = createSelector(
  selectChoresState,
  (state: ChoresState) => state.chores,
)

export const selectedChore = createSelector(
  selectChoreState,
  (state: ChoreState) => state.selectedChore,
)
