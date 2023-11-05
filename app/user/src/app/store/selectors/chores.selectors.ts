import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChoresState } from "../reducers/chores.reducer";

export const selectChoresState = createFeatureSelector<ChoresState>('chores');
export const selectChores = createSelector(selectChoresState, (state) => state.chores);