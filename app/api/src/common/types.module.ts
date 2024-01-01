import { DateTime } from 'luxon'

export interface IMetaProperties {
  id: number
  deletedDate: DateTime
  createdDate: DateTime
  updatedDate: DateTime
  version: number
}

export interface IMetaReadRequest<F, S> {
  skip: number
  take: number
  filter?: F[]
  sort?: S[]
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

export interface IMetaQueryParams<F, S> {
  take: number
  skip: number
  filter: F[]
  sort: S[]
  term: string
}
