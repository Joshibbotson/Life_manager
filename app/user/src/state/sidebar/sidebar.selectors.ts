import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectSideBarState = createFeatureSelector<boolean>('sidebar')

export const isSidebarOpen = createSelector(
  selectSideBarState,
  (state: boolean) => state,
)
