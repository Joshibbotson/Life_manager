// sidebar.selectors.ts
import { createSelector } from '@ngrx/store'

export const selectSidebarState = (state: any) => state.sidebar

export const isSidebarOpen = createSelector(
  selectSidebarState,
  (sidebar) => sidebar,
)
