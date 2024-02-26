import { IReadUser } from '../users'

export interface IAuthLoginRequest {
  email: string
  password: string
}

export interface IAuthLoginReponse {
  success: boolean
  token: string
  user: IReadUser
  status: number
  message: string
}

export interface IValidateTknRequest {
  token: string
}

export interface IValidateTknResponse {
  valid: boolean
  message: string
  expiredAt?: string
}
