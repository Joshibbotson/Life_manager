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
  on(AuthActions.rehydrateUser, (state, { user, token }) => ({
    ...state,
    loginResponse: {
      success: true,
      token: token,
      user: user,
      status: 200,
      message: 'Rehydrated user',
    },
  })),
  on(AuthActions.loginUserSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
  })),
  on(AuthActions.loginUserFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.registerUserSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
  })),
  on(AuthActions.registerUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logoutUser, () => ({ ...initialState })),
)
