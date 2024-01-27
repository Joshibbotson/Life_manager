import { createReducer, on } from '@ngrx/store'
import * as SidebarActions from './sidebar.actions'

export const intialSideBarState: boolean = true

export const sidebarReducer = createReducer(
  intialSideBarState,
  on(SidebarActions.toggleSidebar, (state) => {
    return !state
  }),
)
