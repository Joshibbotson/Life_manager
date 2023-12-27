import { IMetaProperties, IMetaReadRequest } from '../common/types.module'

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

export interface IUserReadRequest extends IMetaReadRequest<IReadUser> {}
