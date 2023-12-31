import { createAction, props } from '@ngrx/store'
import { IReadUser } from '../../../../../api/dist/users'

export const rehydrateUser = createAction(
  '[Auth] Rehydrate User',
  props<{ user: IReadUser }>(),
)

export const loginUser = createAction(
  '[Auth] Login User',
  props<{ email: string; password: string }>(),
)

export const loginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ user: IReadUser }>(),
)

export const loginUserFailure = createAction(
  '[Auth] Login User Failure',
  props<{ error: any }>(),
)

export const logoutUser = createAction('[Auth] Logout User')
