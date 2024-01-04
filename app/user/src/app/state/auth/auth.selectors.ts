import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from './auth.reducer'

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginResponse,
)

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error,
)
