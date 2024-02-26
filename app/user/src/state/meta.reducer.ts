import * as AuthActions from './auth/auth.actions'
import { ActionReducer } from '@ngrx/store'

export function clearStateMetaReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.logoutUser.type) {
      return reducer(undefined, action)
    }
    return reducer(state, action)
  }
}
