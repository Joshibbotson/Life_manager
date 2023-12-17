import { IMetaProperties, IMetaReadRequest } from '../common/types.module'

export interface ITodo extends IMetaProperties {
  name: string
  description: string
  createdBy: string
  assignedTo: string
  completed: string
}

export interface ITodoReadRequest extends IMetaReadRequest<ITodo> {}
