import { DateTime } from 'luxon'
import { IMetaProperties, IMetaReadRequest } from '../common/types.module'
import { IReadUser } from '../users'

export interface ITodo extends IMetaProperties {
  title: string
  description: string
  createdBy: string
  assignedTo: string
  dueDate: DateTime | null
  completed: string
}

export interface IReadTodo extends IMetaProperties {
  title: string
  description: string
  createdBy: IReadUser
  assignedTo: IReadUser
  dueDate: DateTime | null
  completed: string
}

export interface ITodoReadRequest extends IMetaReadRequest<IReadTodo> {}
