import { DateTime } from 'luxon'

export interface IMetaProperties {
  id: number
  deletedDate: DateTime
  createdDate: DateTime
  updatedDate: DateTime
  version: number
}

export interface IMetaReadRequest<T, I> {
  skip: number
  take: number
  filter?: T[]
  sort?: I[]
  term?: string
}

export interface IMetaReadReponse<T> extends IPaginationInfo {
  success: boolean
  data: T[]
  error?: string
}

export interface IPaginationInfo {
  skip: number
  take: number
  currentPage: number
  totalPages: number
  count: number
}
