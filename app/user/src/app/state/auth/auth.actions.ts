import { createAction, props } from '@ngrx/store'
import { IAuthLoginReponse } from '../../../../../api/dist/auth/types.module'
import { IUser } from '../../../../../api/dist/users'

export const rehydrateUser = createAction(
  '[Auth] Rehydrate User',
  props<{ user: IUser; token: string }>(),
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

// Should this have IAuthRegisterResponse?
export const registerUser = createAction(
  '[Auth] Register User',
  props<{ name: string; email: string; password: string; locale: string }>(),
)

export const registerUserSuccess = createAction(
  '[Auth] Register User Success',
  props<{ loginResponse: IAuthLoginReponse }>(),
)

export const registerUserFailure = createAction(
  '[Auth] Register User Failure',
  props<{ error: any }>(),
)

export const logoutUser = createAction('[Auth] Logout User')
