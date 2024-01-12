// sidebar.reducer.ts
import { Action, createReducer, on } from '@ngrx/store'
import * as SidebarActions from './sidebar.actions'

export const initialState: boolean = false

const _sidebarReducer = createReducer(
  initialState,
  on(SidebarActions.openSidebar, () => true),
  on(SidebarActions.closeSidebar, () => false),
)

export function sidebarReducer(state: boolean | undefined, action: Action) {
  return _sidebarReducer(state, action)
}
