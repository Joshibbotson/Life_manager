import { DateTime } from 'luxon'

export interface IMetaProperties {
  id: number
  deletedDate: DateTime
  createdDate: DateTime
  updatedDate: DateTime
  version: number
}

export interface IMetaReadRequest<T> {
  skip: number
  take: number
  count: number
  data: T[]
}
