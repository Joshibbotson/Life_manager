import { DateTime } from 'luxon'

export interface IMetaProperties {
  id: number
  deleted: boolean
  createdDate: DateTime
  editedDate: DateTime
}

export interface IMetaReadRequest<T> {
  skip: number
  take: number
  count: number
  data: T[]
}
