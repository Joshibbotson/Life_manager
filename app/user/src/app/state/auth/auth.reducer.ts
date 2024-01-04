import { createReducer, on } from '@ngrx/store'
import * as AuthActions from './auth.actions'
import { IAuthLoginReponse } from '../../../../../api/dist/auth/types.module'

export interface AuthState {
  loginResponse: IAuthLoginReponse | null
  error: any
}

export const initialState: AuthState = {
  loginResponse: null,
  error: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.rehydrateUser, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
  })),
  on(AuthActions.loginUserSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
  })),
  on(AuthActions.loginUserFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logoutUser, (state) => ({ ...state, loginResponse: null })),
)
