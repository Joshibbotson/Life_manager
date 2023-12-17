import { IMetaProperties, IMetaReadRequest } from '../common/types.module'

export interface IUser extends IMetaProperties {
  name: string
  email: string
  active: boolean
  hashedPassword: string
  permissions: string[]
  locale: string
}

export interface IUserReadRequest extends IMetaReadRequest<IUser> {}
