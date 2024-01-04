import { createAction, props } from '@ngrx/store'
import { IReadUser } from '../../../../../api/dist/users'
import { IAuthLoginReponse } from '../../../../../api/dist/auth/types.module'

export const rehydrateUser = createAction(
  '[Auth] Rehydrate User',
  props<{ loginResponse: IAuthLoginReponse }>(),
)

export const loginUser = createAction(
  '[Auth] Login User',
  props<{ email: string; password: string }>(),
)

export const loginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ loginResponse: IAuthLoginReponse }>(),
)

export const loginUserFailure = createAction(
  '[Auth] Login User Failure',
  props<{ error: any }>(),
)

export const logoutUser = createAction('[Auth] Logout User')
