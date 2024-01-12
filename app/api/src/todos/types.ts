import { DateTime } from 'luxon'
import {
  IMetaProperties,
  IMetaQueryParams,
  IMetaReadOneResponse,
  IMetaReadReponse,
  IMetaReadRequest,
} from '../common/types.module'
import { IReadUser } from '../users'

export interface ITodo extends IMetaProperties {
  title: string
  description: string
  createdBy: number
  dueDate: Date | null
  completed: string
}

export interface IReadTodo extends IMetaProperties {
  title: string
  description: string
  createdBy: IReadUser
  dueDate: DateTime | null
  completed: string
}

export interface ITodoCreateRequest extends ITodo {}
export interface ITodoCreateResponse extends IReadTodo {}

export interface IFilter {
  createdById: number
}
export interface ISort {}
export interface ITodoReadRequest extends IMetaReadRequest<IFilter, ISort> {}
export interface ITodoReadResponse extends IMetaReadReponse<IReadTodo> {}
export interface ITodoReadOneByIdResponse
  extends IMetaReadOneResponse<IReadTodo> {}

export interface ITodoUpdateRequest extends Partial<IReadTodo> {}
export interface ITodoUpdateResponse extends IReadTodo {}

export interface ITodoDeleteRequest {
  id: number
}
export interface ITodoDeleteResponse extends IReadTodo {}

export interface ITodoQueryOptions extends IMetaQueryParams<IFilter, ISort> {
  id: number
}
