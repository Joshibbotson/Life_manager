import { createReducer, on } from '@ngrx/store'
import * as AuthActions from './auth.actions'
import { IReadUser } from '../../../../../api/dist/users'

export interface AuthState {
  user: IReadUser | null
  error: any
}

export const initialState: AuthState = {
  user: null,
  error: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.rehydrateUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.loginUserSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.loginUserFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logoutUser, (state) => ({ ...state, user: null })),
)
