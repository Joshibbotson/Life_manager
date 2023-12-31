import { IAuthLoginReponse } from '../auth/types.module'
import {
  IMetaProperties,
  IMetaReadReponse,
  IMetaReadRequest,
} from '../common/types.module'

export interface IUser extends IMetaProperties {
  name: string
  email: string
  active: boolean
  hashedPassword: string
  permissions: string[]
  admin: boolean
  locale: string
}

export interface IReadUser extends IMetaProperties {
  name: string
  email: string
  active: boolean
  permissions: string[]
  admin: boolean
  locale: string
}

export interface IFilter {}

export interface ISort {}

export interface IUserCreateRequest {
  name: string
  email: string
  password: string
  locale: string
}

export interface IUserCreateResponse extends IAuthLoginReponse {}

export interface IUserReadRequest extends IMetaReadRequest<IFilter, ISort> {}
export interface IUserReadResponse extends IMetaReadReponse<IReadUser> {}

export interface IUserUpdateRequest extends Partial<IReadUser> {
  password?: string
}
export interface IUserUpdateResponse extends IMetaReadReponse<IReadUser> {}

export interface IUserDeleteRequest {
  id: number
}
export interface IUserDeleteResponse extends IReadUser {}
